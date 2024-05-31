// src/pages/_app.js
import GlobalStyle from "../../styles";
import transactionsData from "../data/transactions.json";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [transactions, setTransactions] = useState(transactionsData);

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </>
  );
}
