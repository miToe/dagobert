import {
  CategoryAndDate,
  LeftBlock,
  RightBlock,
  StyledAmount,
  StyledCategory,
  StyledDate,
  StyledLink,
} from "@/src/components/styles/List";
import { CategoryIcon } from "@/src/components/CategoryIcon";

// Utility function to get currency symbol
const getCurrencySymbol = (currencyCode) => {
  const symbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
  };
  return symbols[currencyCode] || currencyCode;
};

export function StyledListItem({ transaction }) {

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
          {transaction.amount.toFixed(2)}{" "}
          {getCurrencySymbol(transaction.currency)}
        </StyledAmount>
      </RightBlock>
    </StyledLink>
  );
}
