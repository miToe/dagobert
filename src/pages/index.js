import Link from "next/link";

export default function TransactionList({ transactions }) {
  // Sort transactions by date in descending order
  console.log("not sorted", transactions);
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
  console.log("sorted", sortedTransactions);

  return (
    <div>
      <h1>Transactions</h1>
      <Link href="/transactions/create">Add</Link>
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
