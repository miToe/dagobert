import { useCallback, useState } from "react";
import Link from "next/link";
import {
  ListWrapper, SearchFilterWrapper,
  StyledList,
  StyledTitle,
} from "@/src/components/styles/List";
import { StyledListItem } from "@/src/components/StyledListItem";
import SearchBar from "@/src/components/SearchBar";
import { OhNoContainer } from "@/src/components/styles/OhNo";
import SVGIcon from "../components/SVGIcon";
import Filter from "@/src/components/Filter";
import Button from "@/src/components/Button";

const initialFilterValues = {
  dateFrom: "",
  dateUntil: "",
  transactionType: [],
  category: [],
  paymentMethod: [],
};

export default function TransactionList({ transactions, onCurrencySymbol }) {
  const [searchResults, setSearchResults] = useState(transactions);
  const [filterValues, setFilterValues] = useState(initialFilterValues);
  const [showFilter, setShowFilter] = useState(false);

  const handleSearchResults = useCallback((results) => {
    setSearchResults(results);
  }, []);

  const handleFilterChange = useCallback((newFilterValues) => {
    setFilterValues(newFilterValues);
  }, []);

  const filteredItems = searchResults.filter((transaction) => (
      (!filterValues.dateFrom || new Date(filterValues.dateFrom) <= new Date(transaction.date)) &&
      (!filterValues.dateUntil || new Date(transaction.date) <= new Date(filterValues.dateUntil)) &&
      (filterValues.transactionType.length === 0 || filterValues.transactionType.includes(transaction.transactionType)) &&
      (filterValues.category.length === 0 || filterValues.category.includes(transaction.category)) &&
      (filterValues.paymentMethod.length === 0 || filterValues.paymentMethod.includes(transaction.paymentMethod))
  ));

  const sortedTransactions = filteredItems.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <ListWrapper>
      <StyledTitle>Transactions</StyledTitle>
      <SearchFilterWrapper>
      <SearchBar data={transactions} onSearchResults={handleSearchResults} />
      <Button $variant="primary" startIcon="filter" onClick={() => setShowFilter(true)} />
      </SearchFilterWrapper>
      {showFilter && (
        <Filter
          filterValues={filterValues}
          onFilterChange={handleFilterChange}
          onClose={() => setShowFilter(false)}
        />
      )}
      {filteredItems.length > 0 ? (
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
