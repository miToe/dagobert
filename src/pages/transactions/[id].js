import { useRouter } from "next/router";
import Link from "next/link";
import Modal from "@/src/components/Modal";
import { useState } from "react";
import ChevronLeft from "@/src/assets/icons/chevron_left.svg";
import Button from "@/src/components/styles/Button";
import SVGIcon from "@/src/components/SVGIcon";


export default function TransactionDetails({
                                             transactions,
                                             onDelete,
                                           }) {
  const router = useRouter();
  const { id } = router.query;
  const [modal, setModal] = useState(false);

  // Find transaction by its ID
  const transaction = transactions.find((transaction) => transaction.id === id);

  if (!transaction) {
    return <p>Transaction not found</p>;
  }

  const displayAmount = `${transaction.transactionType === "Expense" && "-"}${transaction.amount.toFixed(2)}`;

  return (
    <>
      <div>
        <Link href={"/"}>Back</Link>
        <h1>{transaction.category}</h1>
        <button onClick={() => {
          router.push(`/transactions/edit/${transaction.id}`);
        }}>Edit
        </button>
        <button onClick={() => setModal(true)}>Delete</button>
      </div>
      {modal && (
        <Modal
          message="Are you sure you want to delete this entry?"
          hint="This will delete this entry permanently and cannot be undone."
          onConfirm={onDelete}
          onCancel={() => setModal(false)}
          id={id}
        />
      )}

      <ul>
        <li>
          <span>
            <b>Transaction Type: </b>
          </span>
          <span>
            {transaction.transactionType}
          </span>
        </li>
        <li>
          <span>
            <b>Amount: </b>
          </span>
          <span>
            {displayAmount} {transaction.currency}
          </span>
        </li>
        <li>
          <span>
            <b>Date: </b>
          </span>
          <span>{transaction.date}</span>
        </li>
        <li>
          <span>
            <b>Category: </b>
          </span>
          <span>{transaction.category}</span>
        </li>
        <li>
          <span>
            <b>Payment Method: </b>
          </span>
          <span>{transaction.paymentMethod}</span>
        </li>
        <li>
          <span>
            <b>Description: </b>
          </span>
          <span>{transaction.description}</span>
        </li>
      </ul>
    </>
  );
}
