import { useRouter } from "next/router";

export default function TransactionForm({ onSubmit, onCancel }) {
  const router = useRouter();

  // const [formData, setFormData] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    onSubmit(data);
    router.push("/");
  }

  // function handleChange(event) {
  //   const { name, value } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // }

  return (
    <div>
      <h1>Expense</h1>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={onCancel}>Cancel</button>
        <div>
          <label>Transaction Type:</label>
          <select
            name="transactionType"
            required
          >
            <option value="Expenses">Expenses</option>
            <option value="Income">Income</option>
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input
            name="amount"
            type="number"
            required
          />
        </div>
        <div>
          <label>Category</label>
          <select
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
          <label>Date:</label>
          <input
            name="date"
            type="date"
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            name="description"
            type="text"
          />
        </div>
        <div>
          <label>Payment Method:</label>
          <select
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

