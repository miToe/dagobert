import Link from "next/link";
import { ListWrapper, StyledList, StyledTitle } from "@/src/components/styles/List";
import { StyledListItem } from "@/src/components/StyledListItem";

export default function TransactionList({ initialData }) {
  // Sort transactions by date in descending order
  const sortedTransactions = initialData.sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <ListWrapper>
      <StyledTitle>Transactions</StyledTitle>
      <StyledList>
        {sortedTransactions.map((transaction) => (
          <li key={transaction.id}>
            <StyledListItem transaction={transaction} />
          </li>
        ))}
      </StyledList>
      <Link href="/transactions/TransactionForm">Add</Link>
    </ListWrapper>
  );
}
