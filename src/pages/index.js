import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ListItem } from "@/src/components/ListItem";
import { calculateBalancesAndData } from "@/src/utils/utils";
import Charts from "@/src/components/Charts";
import {
  Headline,
  ListWrapper,
  SearchFilterWrapper,
  StyledList,
  StyledTitle,
} from "@/src/components/styles/StyledList";
import SearchBar from "@/src/components/SearchBar";
import { OhNoContainer } from "@/src/components/styles/StyledOhNo";
import SVGIcon from "@/src/components/SVGIcon";
import { TotalBalance } from "../components/styles/TotalBalance";
import { AddLinkWrapper } from "@/src/components/styles/StyledAddLink";
import Filter from "@/src/components/Filter";
import { FilterButton } from "@/src/components/FilterButton";
import BackToTop from "@/src/components/BackToTop"; // Adjust the import according to your project structure

const initialFilterValues = {
  dateFrom: "",
  dateUntil: "",
  transactionType: [],
  category: [],
  paymentMethod: [],
};

export default function TransactionList({ transactions, onCurrencySymbol }) {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const handleUpdateBalances = useCallback((newIncome, newExpenses) => {
    setIncome(newIncome);
    setExpenses(newExpenses);
  }, []);

  const totalBalance = income - expenses;

  useEffect(() => {
    const { totalIncome, totalExpenses } =
      calculateBalancesAndData(transactions);
    handleUpdateBalances(totalIncome, totalExpenses);
  }, [transactions, handleUpdateBalances]);

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
      <h1>Hey there!</h1>
      <TotalBalance>
        <div>
          <span>Total Balance</span>
          <span>{totalBalance.toFixed(2)}€</span>
        </div>
        <AddLinkWrapper>
          <Link href="/transactions/create">
            Add Transaction{" "}
            <SVGIcon iconName="add" color="var(--neutrals-white)" />
          </Link>
        </AddLinkWrapper>
      </TotalBalance>
      <Charts
        transactions={transactions}
        onUpdateBalances={handleUpdateBalances}
      />
      <Headline>
        <StyledTitle>Transactions</StyledTitle>
        <SearchFilterWrapper>
          <SearchBar data={transactions} onSearchResults={handleSearchResults} />
          <FilterButton iconName="filter" onClick={() => setShowFilter(true)} />
        </SearchFilterWrapper>
      </Headline>
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
              <ListItem
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
      <BackToTop />
    </ListWrapper>
  );
}
