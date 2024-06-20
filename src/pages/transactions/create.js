import { useRouter } from "next/router";
import Form from "@/src/components/Form";

export default function Create({ onAddTransaction }) {
  const router = useRouter();

  function handleAddTransaction(data) {
    onAddTransaction(data);
    console.log("add", data);
    router.push("/");
  }

  return (
    <Form
      onSubmitForm={handleAddTransaction}
      formTitle={"Add Transaction"}
      confirmButtonText={"Add"}
      addMode
    />
  );
}
