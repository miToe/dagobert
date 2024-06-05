import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import transactionsData from "@/src/data/transactions.json";
import { interFont } from "@/src/styles/font";
import "@/src/styles/global.css";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [transactions, setTransactions] = useLocalStorageState("transactions", {
    defaultValue: transactionsData,
  });
  const [mode, setMode] = useState("default");
  const [action, setAction] = useState("default");
  const router = useRouter();

  function handleMode(mode) {
    setMode(mode);
  }

  function handleAddTransaction(data) {
    const newTransaction = {
      id: uid(),
      ...data,
      amount: parseFloat(data.amount),
    };
    setTransactions([newTransaction, ...transactions]);
  }

  function handleDelete(id) {
    const updatedData = transactions.filter((item) => item.id !== id);
    setTransactions(updatedData);
    router.push("/");
    setMode("default");
    setAction("successfullyDeleted");
  }

  return (
    <>
      <Component
        {...pageProps}
        onDelete={handleDelete}
        initialData={transactions}
        mode={mode}
        onAddTransaction={handleAddTransaction}
        action={action}
        onMode={handleMode}
      />
    </>
  );
}
