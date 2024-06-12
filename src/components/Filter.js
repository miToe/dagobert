import { useState, useEffect, useRef } from "react";
import Button from "@/src/components/Button";
import SVGIcon from "@/src/components/SVGIcon";
import {
  Overlay,
  FilterContainer,
  FilterSection,
  ButtonContainer,
} from "@/src/components/styles/FilterStyled.js";
import Checkbox from "@/src/components/Checkbox";
import { CheckboxGroup } from "@/src/components/styles/CheckboxStyled";

export default function Filter ({ currentFilters, onApplyFilter, onClose }) {
  const [selectedFilters, setSelectedFilters] = useState({
    transactionType: [],
    category: [],
    paymentMethod: [],
  });
  const filterRef = useRef(null);

  useEffect(() => {
    setSelectedFilters(currentFilters);
  }, [currentFilters]);

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

  const handleApplyFilter = () => {
    onApplyFilter(selectedFilters);
    onClose();
  };

  const handleClearAll = () => {
    setSelectedFilters({
      transactionType: [],
      category: [],
      paymentMethod: [],
    });
  };

  return (
    <Overlay>
        <FilterContainer ref={filterRef}>
          <h2>Filter Transactions</h2>
          <FilterSection>
            <h4>Transaction Type</h4>
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
            <h4>Payment Method</h4>
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
            <Button variant="secondary" startIcon="refresh" onClick={handleClearAll}>Clear All</Button>
            <Button variant="primary" onClick={handleApplyFilter}>Apply Filter</Button>
          </ButtonContainer>
        </FilterContainer>
    </Overlay>
  );
};
