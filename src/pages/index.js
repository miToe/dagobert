import Link from "next/link";
import { useState } from "react";
import Filter from "@/src/components/Filter";
import Button from "@/src/components/Button"
import FilterErrorPage from "../components/FilterErrorPage";

export default function TransactionList({ initialData}) {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState(initialData);
  const [currentFilters, setCurrentFilters] = useState({
    transactionType: [],
    category: [],
    paymentMethod: [],
    dateFrom: [],
    dateUntil: [],
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
        (filters.dateFrom === '' || new Date(transaction.date) >= new Date(filters.dateFrom)) &&
        (filters.dateUntil === '' || new Date(transaction.date) <= new Date(filters.dateUntil))
      );
    });
    setFilteredTransactions(filtered);
  };

  // Sort transactions by date in descending order
  const sortedTransactions = filteredTransactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div>
      <h1>Transactions</h1>
      <div>
        <Link href="/transactions/TransactionForm">Add</Link>
        <Button $variant="primary" startIcon="filter" onClick={handleOpenFilter}>Filter</Button>
      </div>
      <ul>
        {filteredTransactions.map((transaction) => (
          <li key={transaction.id}>
            <Link href={`/transactions/${transaction.id}`}>
              <h3>{transaction.category}</h3>
              <div>{transaction.date}</div>
              <div>
                {transaction.amount.toFixed(2)} {transaction.currency}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {isFilterVisible && (
        <Filter
          initialData={initialData}
          currentFilters={currentFilters}
          onApplyFilter={handleApplyFilter}
          onClose={handleCloseFilter}
        />
      )}
      {!isFilterVisible && !filteredTransactions.length && ( // Show FilterErrorPage if no transactions are filtered
        <FilterErrorPage/>
      )}
    </div>
  );
}
