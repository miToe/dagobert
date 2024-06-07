import Link from "next/link";

export default function TransactionList({ initialData, onMode }) {
  // Sort transactions by date in descending order
  const sortedTransactions = initialData.sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <div>
      <h1>Transactions</h1>
      <button type="button" onClick={() => onMode("add")}>Add</button>
      <ul>
        {sortedTransactions.map((transaction) => (
          <li key={transaction.id}>
            <Link href={`/transactions/${transaction.id}`}>
              <h3>{transaction.category}</h3>
              <div>{transaction.date}</div>
              <div>
                {transaction.amount} {transaction.currency}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
