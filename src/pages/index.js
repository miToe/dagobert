// pages/index.js
import { useState } from "react";
import Link from "next/link";
import SearchBar from "@/src/components/SearchBar";
import transactionsData from "@/src/data/transactions.json";

export default function TransactionList({ initialData }) {
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactionsData);

  // Sort transactions by date in descending order
  const sortedTransactions = filteredTransactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div>
      <h1>Transactions</h1>
      <SearchBar
        data={transactionsData}
        onSearchResults={setFilteredTransactions}
      />
      <Link href="/transactions/TransactionForm">Add</Link>
      {sortedTransactions.length > 0 ? (
        <ul>
          {sortedTransactions.map((transaction) => (
            <li key={transaction.id}>
              <Link href={`/transactions/${transaction.id}`}>
                <h3>{transaction.category}</h3>
                <div>{transaction.date}</div>
                <div>
                  {transaction.amount.toFixed(2)} {transaction.currency}
                </div>
                <div>{transaction.paymentMethod}</div>
                <div>{transaction.description}</div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Oh Nooo</p>
      )}
    </div>
  );
}
