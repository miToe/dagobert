import { useRouter } from "next/router";
import transactions from "../../data/transactions.json";
import Link from "next/link";
import ArrowBack from "../../icons/arrow_back.svg";

export default function Transaction() {
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
        <Link href={"/"}>
          <ArrowBack /> Back
        </Link>
        <h1>{transaction.category}</h1>
      </div>
      <div>
        <h2>Amount</h2>
        <div>
          {transaction.amount.toFixed(2)} {transaction.currency}
        </div>
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
    </div>
  );
}
