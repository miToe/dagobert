import { useState } from "react";
import Link from "next/link";
import {
  ListWrapper,
  StyledList,
  StyledTitle,
} from "@/src/components/styles/List";
import { StyledListItem } from "@/src/components/StyledListItem";
import SearchBar from "@/src/components/SearchBar";


export default function TransactionList({ transactions, onCurrencySymbol }) {
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const handleSearchResults = (results) => {
    setFilteredTransactions(results);
  };

  // Sort transactions by date in descending order
  const sortedTransactions = filteredTransactions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <ListWrapper>
      <StyledTitle>Transactions</StyledTitle>
      <SearchBar data={transactions} onSearchResults={handleSearchResults} />
      <StyledList>
        {sortedTransactions.map((transaction) => (
          <li key={transaction.id}>
            <StyledListItem transaction={transaction} onCurrencySymbol={onCurrencySymbol} />
          </li>
        ))}
      </StyledList>
      <Link href="/transactions/create">Add</Link>
    </ListWrapper>
  );
}
