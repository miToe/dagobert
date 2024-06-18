import { useState, useEffect, useRef } from "react";
import Button from "@/src/components/Button";
import {
  Overlay,
  FilterContainer,
  FilterSection,
  ButtonContainer,
} from "@/src/components/styles/FilterStyled";
import Checkbox from "@/src/components/Checkbox";
import { CheckboxGroup } from "@/src/components/styles/CheckboxStyled";
import DateFilter from "@/src/components/DateFilter";

export default function Filter({ filterValues, onFilterChange, onClose }) {
  const [selectedFilters, setSelectedFilters] = useState(filterValues);
  const filterRef = useRef(null);

  useEffect(() => {
    setSelectedFilters(filterValues);
  }, [filterValues]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleCheckboxChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value],
    }));
  };

  const handleDateChange = (field, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleApplyFilter = () => {
    onFilterChange(selectedFilters);
    onClose();
  };

  const handleClearAll = () => {
    const clearedFilters = {
      transactionType: [],
      category: [],
      paymentMethod: [],
      dateFrom: "",
      dateUntil: "",
    };
    setSelectedFilters(clearedFilters);
    onFilterChange(clearedFilters);
    onClose();
  };

  return (
    <Overlay>
      <FilterContainer ref={filterRef}>
        <h2>Filter transactions</h2>
        <FilterSection>
          <DateFilter
            dateFrom={selectedFilters.dateFrom}
            dateUntil={selectedFilters.dateUntil}
            onDateChange={handleDateChange}
          />
        </FilterSection>
        <FilterSection>
          <h4>Transaction type</h4>
          <CheckboxGroup>
            <label>
              <Checkbox
                value="Expense"
                checked={selectedFilters.transactionType.includes("Expense")}
                onChange={() => handleCheckboxChange("transactionType", "Expense")}
              />
              Expense
            </label>
            <label>
              <Checkbox
                value="Income"
                checked={selectedFilters.transactionType.includes("Income")}
                onChange={() => handleCheckboxChange("transactionType", "Income")}
              />
              Income
            </label>
          </CheckboxGroup>
        </FilterSection>
        <FilterSection>
          <h4>Categories</h4>
          <CheckboxGroup>
            {["Entertainment", "Food", "Shopping", "Transport"].map((category) => (
              <label key={category}>
                <Checkbox
                  value={category}
                  checked={selectedFilters.category.includes(category)}
                  onChange={() => handleCheckboxChange("category", category)}
                />
                {category}
              </label>
            ))}
          </CheckboxGroup>
        </FilterSection>
        <FilterSection>
          <h4>Payment method</h4>
          <CheckboxGroup>
            {["Credit Card", "Debit Card", "Cash", "PayPal"].map((method) => (
              <label key={method}>
                <Checkbox
                  value={method}
                  checked={selectedFilters.paymentMethod.includes(method)}
                  onChange={() => handleCheckboxChange("paymentMethod", method)}
                />
                {method}
              </label>
            ))}
          </CheckboxGroup>
        </FilterSection>
        <ButtonContainer>
          <Button $variant="secondary" startIcon="refresh" onClick={handleClearAll}>Clear All</Button>
          <Button $variant="primary" onClick={handleApplyFilter}>Apply Filter</Button>
        </ButtonContainer>
      </FilterContainer>
    </Overlay>
  );
}
