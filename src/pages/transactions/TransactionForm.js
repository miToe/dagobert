import { useRouter } from "next/router";
import Form from "@/src/components/Form";

export default function TransactionForm({
                                          transactions,
                                          mode,
                                          onAddTransaction,
                                          onEditTransaction,
                                        }) {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onAddTransaction(data);
    console.log(data);
    router.push("/");
  }

  return (
    <>
      {mode === "add" && (
        <Form
          onSubmitForm={handleSubmit}
          transactions={transactions}
        />
      )}
      {mode === "edit" && (
        <Form
          onSubmitForm={(updatedTransaction) => {
            onEditTransaction(transactions.id, updatedTransaction);
          }}
          transactions={transaction}
        />
      )}
    </>
  );
}
