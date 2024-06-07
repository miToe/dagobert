import { useState } from "react";
import { useRouter } from "next/router";
import transactionsData from "@/src/data/transactions.json";
import "@/src/styles/global.css";
import { uid } from "uid";
import Alert from "@/src/components/Alert";
import useLocalStorageState from "use-local-storage-state";
import "@/src/styles/ui-colors.css"
import React from "react";

export default function App({ Component, pageProps}) {
  const [transactions, setTransactions] = useLocalStorageState("transactions", {
    defaultValue: transactionsData,
  });
  const [mode, setMode] = useState("default");
  const router = useRouter();
  const [alert, setAlert] = useState({
    isOpen: false,
    alertMessage: "",
  });

  function handleAlert(alertMessage) {
    setAlert({ isOpen: true, alertMessage});
  }

  function handleAlertClose() {
    setAlert({ isOpen: false, message: "" });
  }

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
  handleAlert("Transaction successfully deleted!");}

  return (
    <>
      <Component
        {...pageProps}
        onDelete={handleDelete}
        initialData={transactions}
        mode={mode}
        onAddTransaction={handleAddTransaction}
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
