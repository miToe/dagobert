import { useState } from "react";
import { useRouter } from "next/router";
import Dropdown from "@/src/components/Dropdown";
import Button from "@/src/components/Button";
import options from "@/src/data/options.json";

export default function Form({
  onSubmitForm,
  initialData = {
    transactionType: "",
    amount: "",
    currency: "EUR",
    date: new Date().toISOString().substring(0, 10),
    category: "",
    paymentMethod: "",
    description: "",
  },
  formTitle,
  confirmButtonText,
  addMode,
  editMode,
}) {
  const router = useRouter();
  const { id } = router.query;

  // Konstanten aus der importierten JSON-Datei
  const {
    transactionTypeOptions,
    currencyOptions,
    categoryOptions,
    paymentMethodOptions,
  } = options;

  const [dropdownError, setDropdownError] = useState("");
  const [formValues, setFormValues] = useState(initialData);

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
    if (formValues.transactionType === "Expense") {
      formValues.amount = -Math.abs(parseFloat(formValues.amount));
    } else {
      formValues.amount = Math.abs(parseFloat(formValues.amount));
    }
    onSubmitForm(formValues);
    router.push("/");
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
    <form onSubmit={handleSubmit}>
      <div>
        {addMode && (
          <Button
            $variant="secondary"
            type="button"
            onClick={() => {
              router.push("/");
            }}
          >
            Cancel
          </Button>
        )}
        {editMode && (
          <Button
            $variant="secondary"
            type="button"
            onClick={() => {
              router.push(`/transactions/${id}`);
            }}
          >
            Cancel
          </Button>
        )}
        <h2>{formTitle}</h2>
      </div>

      <Dropdown
        label="Transaction Type"
        name="transactionType"
        options={transactionTypeOptions}
        buttonText="Select a transaction type"
        onOptionClick={(option) => handleOptionClick("transactionType", option)}
        required={true}
        errorMessage={dropdownError}
        defaultSelected={formValues.transactionType}
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
      <Button $variant="primary" endIcon="add" type="submit">
        {confirmButtonText}
      </Button>
    </form>
  );
}
