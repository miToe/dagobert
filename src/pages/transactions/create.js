import { useRouter } from "next/router";
import Form from "@/src/components/Form";

export default function Create({ onAddTransaction }) {
  const router = useRouter();

  function handleAdd(data) {
    onAddTransaction(data);
    router.push("/");
  }

  return (
    <Form
      onSubmitForm={handleAdd}
    />
  );
}