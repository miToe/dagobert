import { useState } from "react";
import { useRouter } from "next/router";
import Dropdown from "@/src/components/Dropdown";

export default function TransactionForm({ onAddTransaction, onAlert }) {
  const router = useRouter();

  const transactionTypeOptions = ["Expense", "Income"];
  const [dropdownError, setDropdownError] = useState("");
  const [formValues, setFormValues] = useState({
    amount: "",
    currency: "EUR",
    category: "",
    date: new Date().toISOString().substring(0, 10),
    description: "",
    paymentMethod: "",
    transactionType: "",
  });

  const handleOptionClick = (option) => {
    setDropdownError(""); // Reset error when option is selected
    setFormValues({ ...formValues, transactionType: option });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();

    if (!formValues.transactionType) {
      setDropdownError("Field required");
      return;
    }

    setDropdownError("");

    // Convert amount to negative if transaction type is "Expense"
    if (formValues.transactionType === "Expense") {
      formValues.amount = -Math.abs(parseFloat(formValues.amount)); // Convert to negative
    } else {
      formValues.amount = Math.abs(parseFloat(formValues.amount)); // Ensure positive
    }
    onAddTransaction(formValues);
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
    handleInputChange(event); // Update form values
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
        <button type="button" onClick={() => router.push("/")}>
          Cancel
        </button>

        <Dropdown
          label="Transaction Type:"
          options={transactionTypeOptions}
          buttonText="Select an option"
          onOptionClick={handleOptionClick}
          required={true}
          name="transactionType"
          errorMessage={dropdownError}
        />

        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            value={formValues.amount}
            onChange={handleAmountInput}
            onKeyDown={handleAmountKeyDown}
            placeholder="Enter amount (e.g.: 123.45)"
            required
          />
        </div>

        <div>
          <label htmlFor="currency">Currency:</label>
          <select
            id="currency"
            name="currency"
            value={formValues.currency}
            onChange={handleInputChange}
            required
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formValues.category}
            onChange={handleInputChange}
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
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            name="date"
            type="date"
            value={formValues.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            cols="30"
            value={formValues.description}
            onChange={handleInputChange}
            placeholder="Enter description (optional)"
          />
        </div>

        <div>
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formValues.paymentMethod}
            onChange={handleInputChange}
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
