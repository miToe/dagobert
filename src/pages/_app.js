import { useState } from "react";
import { useRouter } from "next/router";
import transactionsData from "@/src/data/transactions.json";
import "@/src/styles/global.css";
import { uid } from "uid";
import Alert from "@/src/components/Alert";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [transactions, setTransactions] = useLocalStorageState("transactions", { defaultValue: transactionsData });
  const [mode, setMode] = useState("default");
  const [alert, setAlert] = useState({ isOpen: false, alertMessage: "" });
  console.log(mode);

  //-------------App mode logic-------------
  function handleMode(mode) {
    if (mode === "add") {
      setMode("add");
      console.log(mode);
      router.push("./transactions/TransactionForm");
    } else if (mode === "edit") {
      setMode("edit");
      console.log(mode);
      router.push("./TransactionForm");
    } else if (mode === "delete") {
      setMode("delete");
      console.log(mode);
    } else {
      setMode("default");
      console.log(mode);
    }
  }

  //----------------------------------------


  //-------------Alert logic-------------
  function handleAlert(alertMessage) {
    setAlert({ isOpen: true, alertMessage });
  }

  function handleAlertClose() {
    setAlert({ isOpen: false, message: "" });
  }

  //-------------------------------------


  //-------------Transaction form logic-------------
  function handleAddTransaction(data) {
    const newTransaction = {
      id: uid(),
      ...data,
      amount: parseFloat(data.amount),
    };
    setTransactions([newTransaction, ...transactions]);
  }

  function handleEditTransaction(id, updatedTransaction) {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction),
    );
  }

  function handleDelete(id) {
    setTransactions(transactions.filter((item) => item.id !== id));
    router.push("/");
    handleAlert("Transaction successfully deleted!");
    handleMode("default");
    console.log(mode);
  }

  //------------------------------------------------

  return (
    <>
      <Component
        {...pageProps}
        onDelete={handleDelete}
        transactions={transactions}
        mode={mode}
        onAddTransaction={handleAddTransaction}
        onEditTransaction={handleEditTransaction}
        onMode={handleMode}
        onAlert={handleAlert}
      />
      <Alert
        isOpen={alert.isOpen}
        message={alert.alertMessage}
        onAlertClose={handleAlertClose}
        duration={3000}
      />
    </>
  );
}
