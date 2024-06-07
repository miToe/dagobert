import React, { useRef } from "react";
import { useRouter } from "next/router";
import Button from "@/src/components/styles/Button";

export default function TransactionForm({ onAddTransaction, onAlert }) {
  const router = useRouter();
  const typeRef = useRef();
  const amountRef = useRef();
  const currencyRef = useRef();

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // Convert amount to negative if transaction type is "Expense"
    if (data.transactionType === "Expense") {
      data.amount = -Math.abs(parseFloat(data.amount)); // Convert to negative
    } else {
      data.amount = Math.abs(parseFloat(data.amount)); // Ensure positive
    }
    onAddTransaction(data);
    router.push("/");
    onAlert("Transaction successfully added!");
  }

  // Function to handle input events on the amount input field
  function handleAmountInput(event) {
    const value = event.target.value;
    // Remove any negative signs
    if (value.includes("-")) {
      event.target.value = value.replace("-", "");
    }
    // Ensure only two decimal places are allowed
    if (value.includes(".")) {
      const [integerPart, decimalPart] = value.split(".");
      if (decimalPart.length > 2) {
        event.target.value = `${integerPart}.${decimalPart.substring(0, 2)}`;
      }
    }
  }

  // Function to prevent typing "-" in the amount input field
  function handleAmountKeyDown(event) {
    if (event.key === "-") {
      event.preventDefault();
    }
  }

  return (
    <div>
      <h1>Add Transaction</h1>
      <form onSubmit={handleSubmit}>
        <Button
          variant="secondary"
          type="button"
          onClick={() => router.push("/")}>Cancel</Button>
        {/* Dropdown for selecting transaction type */}
        <div>
          <label htmlFor="transactionType">Transaction Type:</label>
          <select
            id="transactionType"
            name="transactionType"
            ref={typeRef}
            required
          >
            <option value="">Select Transaction Type</option>
            <option value="Expense">Expense</option>
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
            min="0"
            ref={amountRef}
            onInput={handleAmountInput}
            onKeyDown={handleAmountKeyDown}
            placeholder="Enter amount (e.g.: 123.45)"
            required
          />
        </div>
        {/* Dropdown for selecting currency */}
        <div>
          <label htmlFor="currency">Currency:</label>
          <select id="currency" name="currency" ref={currencyRef} required>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>
        {/* Dropdown for selecting category */}
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" required>
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
          <select id="paymentMethod" name="paymentMethod" required>
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Cash">Cash</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
        {/* Submit button */}
        <Button
          variant="primary"
          endIcon="add"
          onClick={onAddTransaction}>Add</Button>
      </form>
    </div>
  );
}
