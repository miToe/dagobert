import { AmountInputField, AmountLabel, AmountWrapper } from "@/src/components/styles/StyledAmountInput";
import { useEffect } from "react";
import { validateInput } from "@/src/utils/validation";

export default function AmountInput({
                                      id,
                                      name,
                                      value,
                                      type,
                                      onChange,
                                      onKeyDown,
                                      placeholder,
                                      errorMessage,
                                      validate,
                                    }) {

  useEffect(() => {
    if (validate) {
      const isValid = validateInput(value, "number");
      if (!isValid) {
        document.getElementById(id + "-wrapper").classList.add("has-error");
      } else {
        document.getElementById(id + "-wrapper").classList.remove("has-error");
      }
    }
  }, [validate, value, id]);

  return (
    <AmountWrapper id={id + "-wrapper"} className={errorMessage ? "has-error" : ""}>
      <AmountLabel>Amount</AmountLabel>
      <AmountInputField
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </AmountWrapper>
  );
}