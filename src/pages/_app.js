import { useState } from "react";
import { useRouter } from "next/router";
import transactionsData from "@/src/data/transactions.json";
import { interFont } from "@/src/styles/font";
import "@/src/styles/global.css";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [initialData, setInitialData] = useState(transactions);
  const [mode, setMode] = useState("default");
  const [action, setAction] = useState("default");
  const router = useRouter();

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
    setMode("default");
    setAction("successfullyDeleted");
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
        onMode={handleMode}
      />
    </>
  );
}
