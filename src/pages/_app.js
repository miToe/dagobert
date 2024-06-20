import { useState } from "react";
import { useRouter } from "next/router";
import transactionsData from "@/src/data/transactions.json";
import { uid } from "uid";
import Alert from "@/src/components/Alert";
import useLocalStorageState from "use-local-storage-state";
import GlobalStyle from "@/src/styles/styles";
import ThemeColors from "@/src/styles/theme";

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

// Utility function to get currency symbol
  function getCurrencySymbol(currencyCode) {
    const symbols = {
      USD: "$",
      EUR: "€",
    };
    return symbols[currencyCode] || currencyCode;
  }

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
        transaction.id === id
          ? {
            ...transaction,
            ...updatedTransaction,
            amount: updatedTransaction.amount !== undefined ? parseFloat(updatedTransaction.amount) : transaction.amount,
          }
          : transaction,
      ),
    );
    handleAlert("Transaction successfully updated!");
  }


  function handleDelete(id) {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
    router.push("/");
    handleAlert("Transaction successfully deleted!");
  }

  //------------------------------------------------

  function handleApplyFilter(filteredData) {
    setTransactions(filteredData);
  }

  return (
    <>
      <GlobalStyle />
      <ThemeColors />
      <Alert
        isOpen={alert.isOpen}
        message={alert.alertMessage}
        onAlertClose={handleAlertClose}
        duration={2000}
      />
      <Component
        {...pageProps}
        initialData={transactions}
        currentFilters={{}}
        onApplyFilter={handleApplyFilter}
        onDelete={handleDelete}
        transactions={transactions}
        onAddTransaction={handleAddTransaction}
        onEditTransaction={handleEditTransaction}
        onAlert={handleAlert}
        onCurrencySymbol={getCurrencySymbol}
      />

    </>
  );
}
