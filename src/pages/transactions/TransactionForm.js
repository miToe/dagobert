import { useRouter } from "next/router";

export default function TransactionForm({ onAddTransaction, onCancel }) {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onAddTransaction(data);
    router.push("/");
  }

  return (
    <div>
      <h1>Add Transaction</h1>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={() => router.push("/")}>Cancel</button>
        <div>
          <label htmlFor={"type"}>Transaction Type:</label>
          <select
            id="type"
            name="type"
            required
          >
            <option value="Expenses">Expenses</option>
            <option value="Income">Income</option>
          </select>
        </div>
        <div>
          <label htmlFor={"amount"}>Amount:</label>
          <input
            id="amount"
            name="amount"
            type="number"
            required
          />
        </div>
        <div>
          <label htmlFor={"currency"}>Currency</label>
          <select
            id="currency"
            name="currency"
            required
          >
            <option value="">Select Currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div>
          <label htmlFor={"category"}>Category</label>
          <select
            id="category"
            name="category"
            required
          >
            <option value="">Select Category</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Transport">Transport</option>
          </select>
        </div>
        <div>
          <label htmlFor={"date"}>Date:</label>
          <input
            id="date"
            name="date"
            type="date"
            required
          />
        </div>
        <div>
          <label htmlFor={"description"}>Description:</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            cols="30"
          />
        </div>
        <div>
          <label htmlFor={"paymentMethod"}>Payment Method:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            required
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Cash">Cash</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

