import { useRef } from "react";
import { useRouter } from "next/router";

export default function TransactionForm({ onAddTransaction }) {
  const router = useRouter();
  const typeRef = useRef();
  const amountRef = useRef();
  const currencyRef = useRef();

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // If the transaction type is "Expenses", convert the amount to negative
    if (data.transactionType === "Expense") {
      data.amount = -Math.abs(parseFloat(data.amount)); // Convert to negative
    } else {
      data.amount = Math.abs(parseFloat(data.amount)); // Ensure positive
    }
    onAddTransaction(data);
    router.push("/");
  }

  // Function to handle changes in the transaction type
  function handleTypeChange() {
    const transactionType = typeRef.current.value;
  }

  // Function to handle changes in the amount input field
  function handleAmountChange() {
    const transactionType = typeRef.current.value;
    const amount = parseFloat(amountRef.current.value);
    // Validate the amount based on the transaction type
    if (transactionType === "Income" && amount < 0) {
      amountRef.current.value = "";
      alert("Income amount cannot be negative");
    }
  }

  // Function to handle input events on the amount input field
  function handleAmountInput(event) {
    const value = event.target.value;
    // Ensure only two decimal places are allowed
    if (value.includes(".")) {
      const [integerPart, decimalPart] = value.split(".");
      if (decimalPart.length > 2) {
        event.target.value = `${integerPart}.${decimalPart.substring(0, 2)}`;
      }
    }
  }

  return (
    <div>
      <h1>Add Transaction</h1>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={() => router.push("/")}>Cancel</button>
        {/* Dropdown for selecting transaction type */}
        <div>
          <label htmlFor="transactionType">Transaction Type:</label>
          <select
            id="transactionType"
            name="transactionType"
            ref={typeRef}
            onChange={handleTypeChange}
            required
          >
            <option value="">Select Transaction Type</option>
            <option value="Expense">Expenses</option>
            <option value="Income">Income</option>
          </select>
        </div>
        {/* Input field for amount */}
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            ref={amountRef}
            onChange={handleAmountChange}
            onInput={handleAmountInput}
            placeholder="Enter amount (e.g.: 123.45)"
            required
          />
        </div>
        {/* Dropdown for selecting currency */}
        <div>
          <label htmlFor="currency">Currency:</label>
          <select
            id="currency"
            name="currency"
            ref={currencyRef}
            required
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>
        {/* Dropdown for selecting category */}
        <div>
          <label htmlFor="category">Category:</label>
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
        {/* Input field for selecting date */}
        <div>
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={new Date().toISOString().substring(0, 10)}
            required
          />
        </div>
        {/* Textarea for entering description */}
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            cols="30"
            placeholder="Enter description (optional)"
          />
        </div>
        {/* Dropdown for selecting payment method */}
        <div>
          <label htmlFor="paymentMethod">Payment Method:</label>
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
        {/* Submit button */}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
