import { useRouter } from "next/router";

export default function TransactionForm({ onAddTransaction }) {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.values(formData);
    onAddTransaction(data);
    console.log(data);
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="transactionType">Transaction Type</label>
      <br />
      <select id="transactionType" name="transactionType">
        <option value="">Select a transaction type</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <br />
      <label htmlFor="amount">Amount</label>
      <br />
      <input
        type="number"
        id="amount"
        name="amount"
        placeholder="Set an amount (e.g.: 50,00)"
      />
      <br />
      <label htmlFor="currency">Currency</label>
      <br />
      <select id="currency" name="currency">
        <option value="">Select currency</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
      </select>
      <br />
      <label htmlFor="date">Date</label>
      <br />
      <input type="date" id="date" name="date" defaultValue={new Date().toISOString().substring(0, 10)} />
      <br />
      <label htmlFor="category">Category</label>
      <br />
      <select id="category" name="category">
        <option value="">Select category</option>
        <option value="Groceries">Groceries</option>
        <option value="Transport">Transport</option>
        <option value="Clothing">Clothing</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <br />
      <label htmlFor="paymentMethod">Payment Method</label>
      <br />
      <select id="paymentMethod" name="paymentMethod">
        <option value="">Select payment method</option>
        <option value="Cash">Cash</option>
        <option value="Debit card">Debit card</option>
        <option value="Credit card">Credit card</option>
        <option value="PayPal">PayPal</option>
        <option value="Apple Pay">Apple Pay</option>
      </select>
      <br />
      <label htmlFor="description">Description</label>
      <br />
      <textarea id="description" name="description" rows="5" cols="50" />
      <button type="submit">Submit</button>
    </form>
  );
}
