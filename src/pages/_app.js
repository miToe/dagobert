import { useState } from "react";
import { useRouter } from "next/router";
import transactions from "@/src/data/transactions.json";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [initialData, setInitialData] = useState(transactions);
  const [mode, setMode] = useState("default");
  const [action, setAction] = useState("default");
  const router = useRouter();

  function handleMode(mode) {
    setMode(mode);
  }

  function handleAddTransaction(data) {
    setInitialData([{ id: uid(), ...data }, ...initialData]);
  }

  function handleCancel() {
    handleMode("default");
  }

  function handleConfirmDelete() {
    handleMode("delete");
  }

  function handleDelete(id) {
    setInitialData((initialData) =>
      initialData.filter((item) => item.id !== id),
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
        initialData={initialData}
        mode={mode}
        onSubmit={handleAddTransaction}
        action={action}
        onCancel={handleCancel}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
