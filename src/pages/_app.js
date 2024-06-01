import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import transactions from "@/src/data/transactions.json";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [initialData, setInitialData] = useState([]);
  const [mode, setMode] = useState("default");
  const [action, setAction] = useState("default");
  const router = useRouter();

  useEffect(() => {
    const localData = localStorage.getItem("transactions");
    if (localData) {
      setInitialData(JSON.parse(localData));
    } else {
      localStorage.setItem("transactions", JSON.stringify(transactions));
      setInitialData(transactions);
    }
  }, []);

  function handleMode(mode) {
    setMode(mode);
  }

  function handleAddTransaction(data) {
    const newTransaction = {
      id: uid(),
      ...data,
      amount: parseFloat(data.amount),
    };
    const updatedData = [newTransaction, ...initialData];
    setInitialData(updatedData);
    localStorage.setItem("transactions", JSON.stringify(updatedData));
  }

  function handleCancel() {
    handleMode("default");
    router.push("/");
  }

  function handleConfirmDelete() {
    handleMode("delete");
  }

  function handleDelete(id) {
    const updatedData = initialData.filter((item) => item.id !== id);
    setInitialData(updatedData);
    localStorage.setItem("transactions", JSON.stringify(updatedData));
    router.push("/");
    handleMode("default");
    setAction("success");
  }

  return (
    <>
      <Component
        {...pageProps}
        onDelete={handleDelete}
        initialData={initialData}
        mode={mode}
        onAddTransaction={handleAddTransaction}
        action={action}
        onCancel={handleCancel}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
