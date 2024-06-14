import { useState } from "react";
import { useRouter } from "next/router";
import transactionsData from "@/src/data/transactions.json";
import "@/src/styles/global.css";
import { uid } from "uid";
import Alert from "@/src/components/Alert";
import useLocalStorageState from "use-local-storage-state";
import "@/src/styles/ui-colors.css"

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [transactions, setTransactions] = useLocalStorageState("transactions", { defaultValue: transactionsData });
  const [alert, setAlert] = useState({ isOpen: false, alertMessage: "" });

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
    handleAlert("Transaction successfully updated!");
  }

  function handleDelete(id) {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
    router.push("/");
    handleAlert("Transaction successfully deleted!");
  }

  //------------------------------------------------

  return (
    <>
      <Component
        {...pageProps}
        onDelete={handleDelete}
        transactions={transactions}
        onAddTransaction={handleAddTransaction}
        onEditTransaction={handleEditTransaction}
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
