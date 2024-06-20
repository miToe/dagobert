import { useState} from "react";
import { useRouter } from "next/router";
import Dropdown from "@/src/components/Dropdown";
import options from "@/src/data/options.json";
import AmountInput from "@/src/components/AmountInput";
import InputField from "@/src/components/InputField";
import Date from "@/src/components/Date";
import { FormWrapper, Headline, StyledTitle } from "@/src/components/styles/StyledForm";
import { LinkedIcon } from "@/src/components/LinkedIcon";

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
  const router = useRouter();
  const { id } = router.query;
  const { transactionTypeOptions, currencyOptions, categoryOptions, paymentMethodOptions } = options;
  const [formValues, setFormValues] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(initialData.date);

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
    const requiredFields = ["transactionType", "currency", "category", "paymentMethod", "amount", "date"];
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormValues((prev) => ({ ...prev, date }));
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
          onOptionClick={(option) => handleOptionClick("transactionType", option)}
          required
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
          required
        />
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
        <Date
          date={selectedDate}
          onDateChange={handleDateChange}
          required
        />
        <InputField
          label="Description"
          name="description"
          placeholder="Enter description (optional)"
          value={formValues.description}
          onChange={handleInputChange}
        />
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
      </FormWrapper>
    </form>
  );
}
