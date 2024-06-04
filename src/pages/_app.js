import { useState } from "react";
import { useRouter } from "next/router";
import transactionsData from "@/src/data/transactions.json";
import "@/src/styles/global.css";

export default function App({ Component, pageProps }) {
  const [transactions, setTransactions] = useState(transactionsData);
  const [mode, setMode] = useState("default");
  const [action, setAction] = useState("default");
  const router = useRouter();

  function handleMode(mode) {
    setMode(mode);
  }
  function handleCancel() {
    handleMode("default");
  }

  function handleConfirmDelete() {
    handleMode("delete");
  }

  function handleDelete(id) {
    setTransactions((initialTransactions) =>
      initialTransactions.filter((item) => item.id !== id)
    );
    router.push("/");
    handleMode("default");
    setAction("success");
  }

  return (
    <>
      <Component
        {...pageProps}
        onDelete={handleDelete}
        transactions={transactions}
        mode={mode}
        action={action}
        onCancel={handleCancel}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
