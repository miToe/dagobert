import transactions from '../data/transactions.json';
import Link from "next/link";


export default function TransactionDetails(transaction) {
  return (
    <div>
        <header>
          <Link href={"/"}>Back</Link>
          <h2>{transaction.category}</h2>
        </header>
    </div>
  )
}
