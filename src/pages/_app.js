import { useState } from "react";
import { useRouter } from "next/router";
import transactions from "@/src/data/transactions.json";

export default function App({ Component, pageProps }) {
  const [initialData, setInitialData] = useState(transactions);
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
        action={action}
        onCancel={handleCancel}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
