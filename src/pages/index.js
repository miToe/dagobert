import Link from "next/link";
import Alert from "@/src/components/Alert";

export default function TransactionList({ transactions, action }) {
  // Sort transactions by date in descending order
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div>
      <h1>Transactions</h1>
      {action === "success" && (
        <Alert
          alertIcon="imagine a check icon"
          alertMessage="Entry successfully deleted"
        />
      )}

      <ul>
        {sortedTransactions.map((transaction) => (
          <li key={transaction.id}>
            <Link href={`/transactions/${transaction.id}`}>
              <h3>{transaction.category}</h3>
              <div>{transaction.date}</div>
              <div>
                {transaction.amount.toFixed(2)} {transaction.currency}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
