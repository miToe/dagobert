import Link from 'next/link'
import CheckIcon from 'src/assets/icons/check.svg';

export default function TransactionList({transactions, successfulDeleted}) {
  // Sort transactions by date in descending order
  const sortedTransactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h1>Transactions</h1>
      <ul>
        {sortedTransactions.map((transaction) => (
          <Link href={`/transactions/${transaction.id}`} key={transaction.id}>
            <li>
              <h3>{transaction.category}</h3>
              <div>{transaction.date}</div>
              <div>{transaction.amount.toFixed(2)} {transaction.currency}</div>
            </li>
          </Link>
          ))}
      </ul>
      {successfulDeleted &&
        <div>
          <div><CheckIcon/></div>
          <p>Entry successfully deleted!</p>
        </div>
      }
    </div>
  );
}
