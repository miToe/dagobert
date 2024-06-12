import { useState } from "react";
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

  function handleOptionClick(name, option) {
    setDropdownError("");
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: option }));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({ ...formValues, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formValues.transactionType) {
      setDropdownError("Field required");
      return;
    }

    setDropdownError("");
    //const amount = parseFloat(formValues.amount).toFixed(2);
    if (formValues.transactionType === "Expense") {
      formValues.amount = -Math.abs(parseFloat(formValues.amount));
      formValues.amount = Math.abs(parseFloat(formValues.amount));
    }
    onAddTransaction(formValues);
    router.push("/");
    onAlert("Transaction successfully added!");
  }

  function handleAmountInput(event) {
    const value = event.target.value;

    if (value.includes("-")) {
      event.target.value = value.replace("-", "");
    }
    if (value.includes(".")) {
      const [integerPart, decimalPart] = value.split(".");
      if (decimalPart.length > 2) {
        event.target.value = `${integerPart}.${decimalPart.substring(0, 2)}`;
      }
    }
    handleInputChange(event);
  }

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
          onClick={() => router.push("/")}
        >
          Cancel
        </Button>

        <Dropdown
          label="Transaction Type"
          name="transactionType"
          options={transactionTypeOptions}
          buttonText="Select a transaction type"
          onOptionClick={(option) =>
            handleOptionClick("transactionType", option)
          }
          required={true}
          errorMessage={dropdownError}
          defaultSelected=""
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
          buttonText={formValues.currency || "Select a currency"}
          onOptionClick={(option) => handleOptionClick("currency", option)}
          required={true}
          errorMessage=""
          defaultSelected={formValues.currency}
        />

        <Dropdown
          label="Category:"
          name="category"
          options={categoryOptions}
          buttonText={formValues.category || "Select a category"}
          onOptionClick={(option) => handleOptionClick("category", option)}
          required={true}
          errorMessage=""
          defaultSelected={formValues.category}
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
          buttonText={formValues.paymentMethod || "Select Payment Method"}
          onOptionClick={(option) => handleOptionClick("paymentMethod", option)}
          required={true}
          errorMessage=""
          defaultSelected={formValues.paymentMethod}
        />

        <Button variant="primary" endIcon="add" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
}
