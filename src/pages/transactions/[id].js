import { useRouter } from "next/router";
import Modal from "@/src/components/Modal";
import { useState } from "react";
import {
  BacklinkWrapper,
  DetailViewWrapper,
  GroupedIcons,
  Headline,
  StyledAmount,
  StyledCategoryTitle,
  StyledDetailAmount,
  StyledDetailDescription,
  StyledDetailItem,
  StyledLink,
  StyledList,
  StyledTitle,
} from "@/src/components/styles/StyledDetailView";
import SVGIcon from "@/src/components/SVGIcon";
import { LinkedIcon } from "@/src/components/LinkedIcon";


export default function TransactionDetails({
                                             transactions,
                                             onDelete,
                                             onCurrencySymbol,
                                           }) {
  const router = useRouter();
  const { id } = router.query;
  const [modal, setModal] = useState(false);

  // Find transaction by its ID
  const transaction = transactions.find((transaction) => transaction.id === id);

  if (!transaction) {
    return <p>Transaction not found</p>;
  }

  const displayAmount = transaction.amount.toFixed(2);

  return (
    <DetailViewWrapper>
      <Headline>
        <BacklinkWrapper>
          <SVGIcon iconName="chevron_left" />
          <StyledLink href={"/"}>Back</StyledLink>
        </BacklinkWrapper>
        <StyledTitle>{transaction.category}</StyledTitle>
        <GroupedIcons>
          <LinkedIcon iconName="edit" onClick={() => {
            router.push(`/transactions/edit/${transaction.id}`);
          }} />
          <LinkedIcon iconName="delete" onClick={() => setModal(true)} />
        </GroupedIcons>
      </Headline>
      {modal && (
        <Modal
          message="Are you sure you want to delete this entry?"
          hint="This will delete this entry permanently and cannot be undone."
          onConfirm={onDelete}
          onCancel={() => setModal(false)}
          id={id}
        />
      )}
      <StyledList>
        <StyledDetailAmount>
          <StyledCategoryTitle>Amount</StyledCategoryTitle>
          <StyledAmount>
            {transaction.transactionType === "Expense" ? "-" : ""}{displayAmount} {onCurrencySymbol(transaction.currency)}
          </StyledAmount>
        </StyledDetailAmount>
        <StyledDetailItem>
          <StyledCategoryTitle>Date</StyledCategoryTitle>
          <span>{transaction.date}</span>
        </StyledDetailItem>
        <StyledDetailItem>
          <StyledCategoryTitle>Category</StyledCategoryTitle>
          <span>{transaction.category}</span>
        </StyledDetailItem>
        <StyledDetailItem>
          <StyledCategoryTitle>Payment Method</StyledCategoryTitle>
          <span>{transaction.paymentMethod}</span>
        </StyledDetailItem>
        <StyledDetailDescription>
          <StyledCategoryTitle>Description</StyledCategoryTitle>
          <span>{transaction.description}</span>
        </StyledDetailDescription>
      </StyledList>
    </DetailViewWrapper>
  );
}
