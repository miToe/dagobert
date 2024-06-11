import Link from "next/link";

export default function TransactionList({ transactions }) {
  // Sort transactions by date in descending order
  const sortedTransactions = transactions.slice().sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );


  return (
    <div>
      <h1>Transactions</h1>
      <Link href="/transactions/create">Add</Link>
      <ul>
        {sortedTransactions.map((transaction) => {
          const displayAmount = `${transaction.transactionType === "Expense" && "-"}${transaction.amount.toFixed(2)}`;

          return (
            <li key={transaction.id}>
              <Link href={`/transactions/${transaction.id}`}>
                <h3>{transaction.category}</h3>
                <div>{transaction.date}</div>
                <div>
                  {displayAmount} {transaction.currency}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
