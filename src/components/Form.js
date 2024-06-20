import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Dropdown from "@/src/components/Dropdown";
import options from "@/src/data/options.json";
import AmountInput from "@/src/components/AmountInput";
import InputField from "@/src/components/InputField";
import Date from "@/src/components/Date";
import {
  FormWrapper,
  Headline,
  StyledTitle,
} from "@/src/components/styles/StyledForm";
import { LinkedIcon } from "@/src/components/LinkedIcon";
import {
  validateInput,
  applyErrorClass,
  addErrorClassStyles,
} from "@/src/utils/validation"; // Import der Validierungsfunktionen

export default function Form({
  onSubmitForm,
  initialData = {
    transactionType: "",
    amount: "",
    currency: "EUR",
    date: "",
    category: "",
    paymentMethod: "",
    description: "",
  },
  formTitle,
  addMode,
  editMode,
}) {
  useEffect(() => {
    addErrorClassStyles();
  }, []);

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
  const [selectedDate, setSelectedDate] = useState(initialData.date);
  const [validate, setValidate] = useState(false);

  const handleOptionClick = (name, option) => {
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormValues((prev) => ({ ...prev, [name]: option }));
    applyErrorClass(
      document.getElementsByName(name)[0],
      validateInput(option, "required")
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    const isValid = validateInput(value, "required");
    applyErrorClass(event.target, isValid);
    if (!isValid) {
      setErrors((prev) => ({ ...prev, [name]: "Field required" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidate(true);
    const requiredFields = [
      { field: "transactionType", type: "required" },
      { field: "amount", type: "number" },
      { field: "currency", type: "required" },
      { field: "date", type: "required" },
      { field: "category", type: "required" },
      { field: "paymentMethod", type: "required" },
    ];
    const newErrors = requiredFields.reduce((acc, { field, type }) => {
      const isValid = validateInput(formValues[field], type);
      applyErrorClass(document.getElementsByName(field)[0], isValid);
      if (!isValid) acc[field] = "Field required";
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
    const isValid = validateInput(value, "number");
    applyErrorClass(event.target, isValid);
    if (!isValid) {
      setErrors((prev) => ({ ...prev, amount: "Invalid amount" }));
    } else {
      setErrors((prev) => ({ ...prev, amount: "" }));
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormValues((prev) => ({ ...prev, date }));
    const isValid = validateInput(date, "required");
    applyErrorClass(document.getElementById("date"), isValid);
    if (!isValid) {
      setErrors((prev) => ({ ...prev, date: "Field required" }));
    } else {
      setErrors((prev) => ({ ...prev, date: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Headline>
        {addMode && (
          <LinkedIcon
            iconName="close"
            onClick={() => {
              router.push("/");
            }}
          >
            Cancel
          </LinkedIcon>
        )}
        {editMode && (
          <LinkedIcon
            iconName="close"
            onClick={() => {
              router.push(`/transactions/${id}`);
            }}
          >
            Cancel
          </LinkedIcon>
        )}
        <StyledTitle>{formTitle}</StyledTitle>
        <LinkedIcon iconName="add" type="submit" />
      </Headline>
      <FormWrapper>
        <Dropdown
          label="Transaction Type"
          name="transactionType"
          options={transactionTypeOptions}
          buttonText="Select a transaction type"
          onOptionClick={(option) =>
            handleOptionClick("transactionType", option)
          }
          errorMessage={errors.transactionType}
          defaultSelected={formValues.transactionType}
        />
        <AmountInput
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          value={formValues.amount}
          onChange={handleAmountInput}
          onKeyDown={(e) => e.key === "-" && e.preventDefault()}
          placeholder="0,00"
          validate={validate}
        />
        {errors.amount && <div style={{ color: "red" }}>{errors.amount}</div>}
        <Dropdown
          label="Currency"
          name="currency"
          options={currencyOptions}
          buttonText={formValues.currency || "Select a currency"}
          onOptionClick={(option) => handleOptionClick("currency", option)}
          errorMessage={errors.currency}
          defaultSelected={formValues.currency}
        />
        <Dropdown
          label="Category"
          name="category"
          options={categoryOptions}
          buttonText={formValues.category || "Select a category"}
          onOptionClick={(option) => handleOptionClick("category", option)}
          errorMessage={errors.category}
          defaultSelected={formValues.category}
        />
        <Date
          date={selectedDate}
          onDateChange={handleDateChange}
          errorMessage={errors.date}
        />
        <InputField
          label="Description"
          name="description"
          placeholder="Enter description (optional)"
          value={formValues.description}
          onChange={handleInputChange}
          errorMessage={errors.description}
        />
        <Dropdown
          label="Payment Method"
          name="paymentMethod"
          options={paymentMethodOptions}
          buttonText={formValues.paymentMethod || "Select Payment Method"}
          onOptionClick={(option) => handleOptionClick("paymentMethod", option)}
          errorMessage={errors.paymentMethod}
          defaultSelected={formValues.paymentMethod}
        />
      </FormWrapper>
    </form>
  );
}
