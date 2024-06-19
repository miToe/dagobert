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
  const {
    transactionTypeOptions,
    currencyOptions,
    categoryOptions,
    paymentMethodOptions,
  } = options;
  const [formValues, setFormValues] = useState(initialData);
  const [errors, setErrors] = useState({});
  const handleOptionClick = (name, option) => {
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormValues((prev) => ({ ...prev, [name]: option }));
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const requiredFields = ["transactionType", "currency", "category", "paymentMethod"];
    const newErrors = requiredFields.reduce((acc, field) => {
      if (!formValues[field]) acc[field] = "Field required";
      return acc;
    }, {});
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    onSubmitForm(formValues);
    router.push("/");
  };
  const handleAmountInput = (event) => {
    let value = event.target.value.replace("-", "");
    if (value.includes(".")) {
      const [integer, decimal] = value.split(".");
      value = `${integer}.${decimal.slice(0, 2)}`;
    }
    setFormValues((prev) => ({ ...prev, amount: value }));
  };
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
        required
        errorMessage={errors.transactionType}
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
          onKeyDown={(e) => e.key === "-" && e.preventDefault()}
          placeholder="Enter amount (e.g.: 123.45)"
          required
        />
      </div>
      <Dropdown
        label="Currency"
        name="currency"
        options={currencyOptions}
        buttonText={formValues.currency || "Select a currency"}
        onOptionClick={(option) => handleOptionClick("currency", option)}
        required
        errorMessage={errors.currency}
        defaultSelected={formValues.currency}
      />
      <Dropdown
        label="Category"
        name="category"
        options={categoryOptions}
        buttonText={formValues.category || "Select a category"}
        onOptionClick={(option) => handleOptionClick("category", option)}
        required
        errorMessage={errors.category}
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
        label="Payment Method"
        name="paymentMethod"
        options={paymentMethodOptions}
        buttonText={formValues.paymentMethod || "Select Payment Method"}
        onOptionClick={(option) => handleOptionClick("paymentMethod", option)}
        required
        errorMessage={errors.paymentMethod}
        defaultSelected={formValues.paymentMethod}
      />
      <Button $variant="primary" endIcon="add" type="submit">
        {confirmButtonText}
      </Button>
    </form>
  );
}