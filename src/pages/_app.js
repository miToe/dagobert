import transactionsData from "../data/transactions.json";
import { useState } from "react";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [transactions, setTransactions] = useState(transactionsData);

  function handleAddTransaction(data) {
    setTransactions([{ id: uid(), ...data }, ...transactions]);
  }

  return (
    <>
      <Component
        {...pageProps}
        transactions={transactions}
        onAddTransaction={handleAddTransaction}
      />
    </>
  );
}
