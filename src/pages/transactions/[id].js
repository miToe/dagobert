import { useRouter } from "next/router";
import { useState } from "react";
import transactions from '../../data/transactions.json';
import Link from "next/link";
import ChevronLeft from "@/src/assets/icons/chevron_left.svg";
import DeleteBin from "src/assets/icons/delete.svg"

export default function TransactionDetails({handleDelete}) {
  const router = useRouter();
  const { id } = router.query;
  const [modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Find transaction by its ID
  const transaction = transactions.find((transaction) => transaction.id === id);

  const onHandleDelete = (id) => {
    setModal(true);
    setDeleteId(id);
  }

  if (!transaction) {
    return <p>Transaction not found</p>;
  }

  return (
    <div>
      <div>
        <Link href={"/"}><ChevronLeft/> Back</Link>
        <h1>{transaction.category}</h1>
        <button onClick={() => onHandleDelete(transaction.id)}> <DeleteBin/> </button>
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
      {modal &&
        <div>
          <div>
            <h2>Are you sure you want to delete this entry?</h2>
            <p>This will delete your entry permanently and cannot be undone.</p>
          </div>
          <div>
            <button onClick={() => setModal(false)}>Cancel</button>
            <button onClick={() => handleDelete(deleteId)}>Delete</button>
          </div>
        </div>
      }
    </div>
  )
}
