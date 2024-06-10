import { useRouter } from "next/router";
import Form from "@/src/components/Form";

export default function TransactionDetails({
                                             transactions,
                                             onEditTransaction,
                                           }) {
  const router = useRouter();
  const { id } = router.query;

  // Find transaction by its ID
  const transaction = transactions.find((transaction) => transaction.id === id);

  if (!transaction) {
    return <p>Transaction not found</p>;
  }

  function handleEdit(updatedTransaction) {
    onEditTransaction(transaction.id, updatedTransaction);
    router.push(`/transactions/${transaction.id}`);
  }

  return (
    <>
      <Form
        onSubmitForm={handleEdit}
        initialData={{
          transactionType: transaction.transactionType,
          amount: transaction.amount,
          currency: transaction.currency,
          date: transaction.date,
          category: transaction.category,
          paymentMethod: transaction.paymentMethod,
          description: transaction.description,
        }}
        formTitle={"Edit Transaction"}
        confirmButtonText={"Update"}
        id={id}
        edit
      />
    </>
  );
}
