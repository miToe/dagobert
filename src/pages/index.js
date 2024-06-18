import Link from "next/link";
import { ListWrapper, StyledList, StyledTitle } from "@/src/components/styles/List";
import { StyledListItem } from "@/src/components/StyledListItem";
import { useState } from "react";
import Filter from "@/src/components/Filter";
import Button from "@/src/components/Button";
import FilterErrorPage from "../components/FilterErrorPage";

export default function TransactionList({ initialData, onCurrencySymbol }) {
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

  const handleApplyFilter = (filters) => {
    setCurrentFilters(filters);

    const filtered = initialData.filter((transaction) => {
      return (
        (filters.transactionType.length === 0 || filters.transactionType.includes(transaction.transactionType)) &&
        (filters.category.length === 0 || filters.category.includes(transaction.category)) &&
        (filters.paymentMethod.length === 0 || filters.paymentMethod.includes(transaction.paymentMethod)) &&
        (filters.dateFrom === "" || new Date(transaction.date) >= new Date(filters.dateFrom)) &&
        (filters.dateUntil === "" || new Date(transaction.date) <= new Date(filters.dateUntil))
      );
    });
    setFilteredTransactions(filtered);
    setIsFilterVisible(false);
  };

  // Sort transactions by date in descending order
  const sortedTransactions = filteredTransactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );


  return (
    <ListWrapper>
      <StyledTitle>Transactions</StyledTitle>
      <Button $variant="primary" startIcon="filter" onClick={handleOpenFilter} />
      <StyledList>
        {sortedTransactions.map((transaction) => (
          <li key={transaction.id}>
            <StyledListItem transaction={transaction} onCurrencySymbol={onCurrencySymbol} />
          </li>
        ))}
      </StyledList>
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
