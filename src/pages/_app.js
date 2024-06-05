import { useState } from "react";
import { useRouter } from "next/router";
import transactionsData from "@/src/data/transactions.json";
import "@/src/styles/global.css";
import { uid } from "uid";
import Toast from "@/src/components/Toast";

export default function App({ Component, pageProps }) {
  const [initialData, setInitialData] = useState(transactionsData);
  const [mode, setMode] = useState("default");
  const router = useRouter();
  const [alert, setAlert] = useState({
    isOpen: false,
    alertMessage: "",
  });

  function handleAlert(alertMessage) {
    setAlert({ isOpen: true, alertMessage});
  }

  function handleMode(newMode) {
    setMode(newMode);
  }

  function handleAddTransaction(data) {
    setInitialData([{ id: uid(), ...data, amount: parseFloat(data.amount) }, ...initialData]);
  }

  function handleDelete(id) {
    setInitialData((initialData) =>
      initialData.filter((item) => item.id !== id),
    );
    router.push("/");
  handleAlert();}

  return (
    <>
      <Component
        {...pageProps}
        onDelete={handleDelete}
        initialData={initialData}
        mode={mode}
        onAddTransaction={handleAddTransaction}
        onMode={handleMode}
        onAlert={handleAlert}
      />
      <Alert
        isOpen={alert.isOpen}
        message={alert.alertMessage}
        duration={3000}
      />
    </>
  );
}
