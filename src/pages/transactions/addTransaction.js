import { useRouter } from "next/router";
import { useState } from "react";

export default function TransactionForm({ initialData, onSubmit }) {
  const router = useRouter();
  const [formData, setFormData] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    router.push("/");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>
          <h1>Theme Creator</h1>
        </legend>
        <label>Amount</label>
        <br />
        <input
          type="number"
          name="amount"
          value={initialData.role}
          onChange={handleChange}
          required
        />
        <button type="submit">Add
        </button>
      </fieldset>
    </form>
  );
}

