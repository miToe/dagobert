import { useState } from "react";
import { useRouter } from "next/router";
import transactions from "@/src/data/transactions.json";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [initialData, setInitialData] = useState(transactions);
  const [mode, setMode] = useState("default");
  const [action, setAction] = useState("default");
  const router = useRouter();

  console.log("reload-main", mode);

  function handleMode(newMode) {
    console.log("handlemode1", mode);
    setMode(newMode);
    console.log("handlemode2", mode);
  }

  function handleAddTransaction(data) {
    setInitialData([{ id: uid(), ...data, amount: parseFloat(data.amount) }, ...initialData]);
  }


  function handleDelete(id) {
    setInitialData((initialData) =>
      initialData.filter((item) => item.id !== id),
    );
    router.push("/");
    setAction("successfullyDeleted");
    setMode("default");
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
