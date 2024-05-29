import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import transactionsData from '../data/transactions.json';

export default function App({ Component, pageProps }) {
  const [transactions, setTransactions] = useState(transactionsData);
  const [successfulDeleted, setSuccessfulDeleted] = useState(false);
  const router = useRouter();

  const handleDelete = (id) => {
    setTransactions((prevItems) => prevItems.filter(item => item.id !== id));
    router.push('/') // Use router to navigate
    setSuccessfulDeleted(true);
  };

  useEffect(() => {
    if (successfulDeleted) {
      setTimeout(() => {setSuccessfulDeleted(false)}, 5000)
    }
  },[successfulDeleted]);

  return (
    <>
      <Component {...pageProps} handleDelete={handleDelete} transactions={transactions} successfulDeleted={successfulDeleted} />
    </>
  );
}
