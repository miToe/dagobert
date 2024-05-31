import useRouter from "next/router";

export default function TransactionForm({ initialData, onSubmit }) {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>
          <h1>Theme Creator</h1>
        </legend>
        <label htmlFor="role">Role :</label>
        <br />
        <input
          type="text"
          id="role"
          name="role"
          defaultValue={initialData.role}
          placeholder="e.g.: primary, secondary"
          required
        />
        <button type="submit">
          {initialData.id ? "UPDATE" : "ADD SCHEME"}
        </button>
        {initialData.id && <button onClick={onCancel}>CANCEL</button>}
      </fieldset>
    </form>
  );
}

