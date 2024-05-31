import Link from "next/link";

export default function TransactionList({ transactions }) {
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div>
      <Link href="/transactionform">Add Transaction</Link>
      <h1>Transactions</h1>
      <ul>
        {sortedTransactions.map((transaction) => (
          <Link href={`/transactions/${transaction.id}`} key={transaction.id}>
            <li>
              <h3>{transaction.category}</h3>
              <div>{transaction.date}</div>
              <div>
                {Number(transaction.amount).toFixed(2)} {transaction.currency}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
