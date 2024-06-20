import {
  CategoryAndDate,
  LeftBlock,
  RightBlock,
  StyledAmount,
  StyledCategory,
  StyledDate,
  StyledLink,
} from "@/src/components/styles/StyledList";
import { CategoryIcon } from "@/src/components/CategoryIcon";

export function ListItem({ transaction, onCurrencySymbol }) {
  const displayAmount = transaction.amount.toFixed(2);

  return (
    <StyledLink href={`/transactions/${transaction.id}`}>
      <LeftBlock>
        <CategoryIcon category={transaction.category} />
        <CategoryAndDate>
          <StyledCategory>{transaction.category}</StyledCategory>
          <StyledDate>
            {new Date(transaction.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).split("/").join(".")}
          </StyledDate>
        </CategoryAndDate>
      </LeftBlock>
      <RightBlock>
        <StyledAmount>
          {transaction.transactionType === "Expense" ? "-" : ""}{displayAmount} {onCurrencySymbol(transaction.currency)}
        </StyledAmount>
      </RightBlock>
    </StyledLink>
  );
}
