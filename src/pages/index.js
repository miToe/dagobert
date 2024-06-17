// pages/index.js
import { useState } from "react";
import Link from "next/link";
import SearchBar from "@/src/components/SearchBar";
import transactionsData from "@/src/data/transactions.json";
import SVGIcon from "@/src/components/SVGIcon";
import { OhNoContainer } from "@/src/components/styles/OhNo";

export default function TransactionList({ transactions }) {
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
      <Link href="/transactions/create">Add</Link>
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
              </Link>
            </li>
          ))}
        </ul>
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
    </div>
  );
}
