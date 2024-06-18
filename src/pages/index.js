import { useCallback, useState } from "react";
import Link from "next/link";
import { ListWrapper, StyledList, StyledTitle } from "@/src/components/styles/List";
import { StyledListItem } from "@/src/components/StyledListItem";
import SearchBar from "@/src/components/SearchBar";
import { OhNoContainer } from "@/src/components/styles/OhNo";
import SVGIcon from "../components/SVGIcon";
import Filter from "@/src/components/Filter";
import Button from "@/src/components/Button";
import FilterErrorPage from "../components/FilterErrorPage";

export default function TransactionList({ initialData, transactions, onCurrencySymbol }) {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState(initialData);
  const [currentFilters, setCurrentFilters] = useState({
    transactionType: [],
    category: [],
    paymentMethod: [],
    dateFrom: "",
    dateUntil: "",
  });

  const handleOpenFilter = () => {
    setIsFilterVisible(true);
  };

  const handleCloseFilter = () => {
    setIsFilterVisible(false);
  };

  const filtered = filteredTransactions.filter((transaction) => {
    return (
      (currentFilters.transactionType.length === 0 || currentFilters.transactionType.includes(transaction.transactionType)) &&
      (currentFilters.category.length === 0 || currentFilters.category.includes(transaction.category)) &&
      (currentFilters.paymentMethod.length === 0 || currentFilters.paymentMethod.includes(transaction.paymentMethod)) &&
      (currentFilters.dateFrom === "" || new Date(transaction.date) >= new Date(currentFilters.dateFrom)) &&
      (currentFilters.dateUntil === "" || new Date(transaction.date) <= new Date(currentFilters.dateUntil))
    );
  });

  const handleApplyFilter = (filters) => {
    setCurrentFilters(filters);
    setFilteredTransactions(filtered);
    setIsFilterVisible(false);
  };

  const handleSearchResults = useCallback((results) => {
    setFilteredTransactions(results);
  }, []);

  const sortedTransactions = filteredTransactions.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <ListWrapper>
      <StyledTitle>Transactions</StyledTitle>
      <Button $variant="primary" startIcon="filter" onClick={handleOpenFilter} />
      <SearchBar data={transactions} onSearchResults={handleSearchResults} />
      {filtered.length > 0 ? (
        <StyledList>
          {sortedTransactions.map((transaction) => (
            <li key={transaction.id}>
              <StyledListItem
                transaction={transaction}
                onCurrencySymbol={onCurrencySymbol}
              />
            </li>
          ))}
        </StyledList>
      ) : (
        <OhNoContainer>
          <SVGIcon
            iconName="ohNo"
            color="var(--neutrals-dark-gray)"
            size="115"
          />
          <br />
          <span>
            <b>No matching results found.</b>
            <br />
            Please try again.
          </span>
        </OhNoContainer>
      )}
      {isFilterVisible && (
        <Filter
          initialData={initialData}
          currentFilters={currentFilters}
          onApplyFilter={handleApplyFilter}
          onClose={handleCloseFilter}
        />
      )}
      {!isFilterVisible && !filteredTransactions.length && (
        <FilterErrorPage />
      )}
      <Link href="/transactions/create">Add</Link>
    </ListWrapper>
  );
}
