import transactions from '../data/transactions.json'
import Link from 'next/link'

function TransactionList() {
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
              {/* Convert the date stored in the date property of the transaction object into a localized date string
                by using the date format based on the user's operating system/browser settings */}
              <div>{new Intl.DateTimeFormat(typeof navigator !== 'undefined' ? navigator.language : 'en-US').format(new Date(transaction.date))}</div>
              <div>{transaction.amount.toFixed(2)} {transaction.currency}</div>
            </li>
          </Link>
          ))}
      </ul>
    </div>
  );
}

export default TransactionList;
