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

// Utility function to get currency symbol
const getCurrencySymbol = (currencyCode) => {
  const symbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    // Add more currencies as needed
  };
  return symbols[currencyCode] || currencyCode;
};

// Define icons for each category
const categoryIcons = {
  Groceries: "grocery",
  Clothing: "apparel",
  Transportation: "commute",
};

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
                  {/* Check if the iconName exists before accessing its properties */}
                  {categoryIcons[transaction.category] && (
                    <SVGIcon
                      iconName={categoryIcons[transaction.category]}
                      // Add other props as needed
                    />
                  )}
                </IconWrapper>

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
          </li>
        ))}
      </StyledList>
      <Link href="/transactions/TransactionForm">Add</Link>
    </ListWrapper>
  );
}
