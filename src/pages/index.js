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
    const { transactionType, category, paymentMethod } = filters;
    const filtered = initialData.filter((transaction) => {
      return (
        (transactionType.length === 0 || transactionType.includes(transaction.transactionType)) &&
        (category.length === 0 || category.includes(transaction.category)) &&
        (paymentMethod.length === 0 || paymentMethod.includes(transaction.paymentMethod))
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
        {sortedTransactions.map((transaction) => (
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
