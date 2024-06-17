import { useState, useCallback } from "react";
import Link from "next/link";
import {
  ListWrapper,
  StyledList,
  StyledTitle,
} from "@/src/components/styles/List";
import { StyledListItem } from "@/src/components/StyledListItem";
import SearchBar from "@/src/components/SearchBar";
import { OhNoContainer } from "@/src/components/styles/OhNo";
import SVGIcon from "../components/SVGIcon";

export default function TransactionList({ transactions, onCurrencySymbol }) {
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  const handleSearchResults = useCallback((results) => {
    setFilteredTransactions(results);
  }, []);

  const sortedTransactions = filteredTransactions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <ListWrapper>
      <StyledTitle>Transactions</StyledTitle>
      <SearchBar data={transactions} onSearchResults={handleSearchResults} />
      {filteredTransactions.length > 0 ? (
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
      <Link href="/transactions/create">Add</Link>
    </ListWrapper>
  );
}
