import { useRouter } from "next/router";
import Link from "next/link";
import Modal from "@/src/components/Modal";
import ChevronLeft from "@/src/assets/icons/chevron_left.svg";
import DeleteBin from "@/src/assets/icons/delete.svg";

export default function TransactionDetails({
  initialData,
  onConfirmDelete,
  onDelete,
  mode,
  onCancel,
}) {
  const router = useRouter();
  const { id } = router.query;

  // Find transaction by its ID
  const transaction = initialData.find((transaction) => transaction.id === id);

  if (!transaction) {
    return <p>Transaction not found</p>;
  }

  return (
    <>
      <div>
        <Link href={"/"}>
          <ChevronLeft /> Back
        </Link>
        <h1>{transaction.category}</h1>
        <button onClick={onConfirmDelete}>
          <DeleteBin />
        </button>
      </div>
      {mode === "delete" && (
        <Modal
          message="Are you sure you want to delete this entry?"
          hint="This will delete this entry permanently and cannot be undone."
          onConfirm={() => onDelete(id)}
          onCancel={onCancel}
        />
      )}

      <ul>
        <li>
          <span>
            <b>Amount: </b>
          </span>
          <span>
            {transaction.amount.toFixed(2)} {transaction.currency}
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
