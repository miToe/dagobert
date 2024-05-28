import transactions from '../data/transactions.json'

function TransactionList() {
  // Sort transactions by date in descending order
  const sortedTransactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h1>Transactions</h1>
      <ul>
        {sortedTransactions.map((transaction) => (
          <li key={transaction.id}>
            <h3>{transaction.category}</h3>
            <div>{new Date(transaction.date).toLocaleDateString('de-DE')}</div>
            <div>{transaction.currency}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
