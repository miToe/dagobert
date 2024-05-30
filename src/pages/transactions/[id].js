import { useRouter } from "next/router";
import transactions from "../../data/transactions.json";
import Link from "next/link";
import Modal from "@/src/components/Modal";
import ChevronLeft from "@/src/assets/icons/chevron_left.svg";
import DeleteBin from "src/assets/icons/delete.svg";


export default function TransactionDetails({ onConfirmDelete, onDelete, mode, onCancel }) {
  const router = useRouter();
  const { id } = router.query;

  // Find transaction by its ID
  const transaction = transactions.find((transaction) => transaction.id === id);

  if (!transaction) {
    return <p>Transaction not found</p>;
  }

  return (
    <div>
      <div>
        <Link href={"/"}><ChevronLeft /> Back</Link>
        <h1>{transaction.category}</h1>
        <button onClick={onConfirmDelete}><DeleteBin /></button>
      </div>
      <div>
        <h2>Amount</h2>
        <div>{transaction.amount.toFixed(2)} {transaction.currency}</div>
      </div>
      <div>
        <h2>Date</h2>
        <div>{transaction.date}</div>
      </div>
      <div>
        <h2>Category</h2>
        <div>{transaction.category}</div>
      </div>
      <div>
        <h2>Payment Method</h2>
        <div>{transaction.paymentMethod}</div>
      </div>
      <div>
        <h2>Description</h2>
        <div>{transaction.description}</div>
      </div>
      {mode === "delete" && (
        <Modal
          message="Really?.. Delete?"
          onConfirm={() => onDelete(id)}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}
// Test
