import Link from "next/link";
import {
  CategoryAndDate,
  IconWrapper,
  LeftBlock,
  ListWrapper,
  RightBlock,
  StyledAmount,
  StyledCategory,
  StyledDate,
  StyledLink,
  StyledList,
  StyledTitle,
} from "@/src/components/styles/List";
import SVGIcon from "@/src/components/SVGIcon";

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
            <StyledLink href={`/transactions/${transaction.id}`}>
              <LeftBlock>
                <IconWrapper>
                  <SVGIcon iconName="grocery" />
                </IconWrapper>
                <CategoryAndDate>
                  <StyledCategory>{transaction.category}</StyledCategory>
                  <StyledDate>{transaction.date}</StyledDate>
                </CategoryAndDate>
              </LeftBlock>
              <RightBlock>
                <StyledAmount>
                  {transaction.amount.toFixed(2)} {transaction.currency}
                </StyledAmount>
              </RightBlock>
            </StyledLink>
          </li>
        ))}
      </StyledList>
      <Link href="/transactions/TransactionForm">Add</Link>
    </ListWrapper>
  );
}
