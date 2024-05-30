import { useState } from "react";
import { useRouter } from "next/router";
import transactionsData from "../data/transactions.json";

export default function App({ Component, pageProps }) {
  const [transactions, setTransactions] = useState(transactionsData);
  const [mode, setMode] = useState("default");
  const [action, setAction] = useState("default");
  const router = useRouter();

  function handleCancel() {
    setMode("default");
  }

  function handleConfirmDelete() {
    console.log("handleConfirmDelete");
    setMode("delete");
  }

  function handleDelete(id) {
    setTransactions((initialTransactions) => initialTransactions.filter(item => item.id !== id));
    router.push("/");
    setMode("default");
    setAction("success");
  }

  return (
    <>
      <Component {...pageProps} onDelete={handleDelete} transactions={transactions} mode={mode} action={action}
                 onCancel={handleCancel} onConfirmDelete={handleConfirmDelete} />
    </>
  );
}
