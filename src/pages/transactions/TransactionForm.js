import React, { useState } from "react";
import { useRouter } from "next/router";
import Dropdown from "@/src/components/Dropdown";
import Button from "@/src/components/styles/Button";

export default function TransactionForm({ onAddTransaction, onAlert }) {
  const router = useRouter();

  const transactionTypeOptions = ["Expense", "Income"];
  const currencyOptions = ["EUR", "US"];
  const categoryOptions = ["Entertainment", "Food", "Shopping", "Transport"];
  const paymentMethodOptions = ["Credit Card", "Debit Card", "Cash", "PayPal"];

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
        <Button
          variant="secondary"
          type="button"
          onClick={() => router.push("/")}>Cancel</Button>

        <Dropdown
          label="Transaction Type"
          name="transactionType"
          options={transactionTypeOptions}
          buttonText="Select a transaction type"
          onOptionClick={handleOptionClick}
          required={true}
          errorMessage="" // Can be replaced with an actual error message
          defaultSelected="" // Specify the pre-selected option here
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

        <Dropdown
          label="Currency:"
          name="currency"
          options={currencyOptions}
          buttonText="Select a currency"
          onOptionClick={handleOptionClick}
          required={true}
          errorMessage="" // Can be replaced with an actual error message
          defaultSelected="EUR" // Specify the pre-selected option here
        />

        <Dropdown
          label="Category:"
          name="category"
          options={categoryOptions}
          buttonText="Select a category"
          onOptionClick={handleOptionClick}
          required={true}
          errorMessage="" // Can be replaced with an actual error message
          defaultSelected="" // Specify the pre-selected option here
        />

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

        <Dropdown
          label="Payment Method:"
          name="paymentMethod"
          options={paymentMethodOptions}
          buttonText="Select Payment Method"
          onOptionClick={handleOptionClick}
          required={true}
          errorMessage="" // Can be replaced with an actual error message
          defaultSelected="" // Specify the pre-selected option here
        />

        <Button
          variant="primary"
          endIcon="add"
          onClick={onAddTransaction}>Add</Button>
      </form>
    </div>
  );
}
