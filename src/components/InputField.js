import { useState } from "react";
import { Label, Textarea, TextAreaWrapper } from "/src/components/styles/StyledInputField.js";

export default function InputField({ id, label, name, placeholder, value, onChange }) {
  const [isFilled, setIsFilled] = useState(false);

  function handleBlur(event) {
    setIsFilled(event.target.value !== "");
  }

  return (
    <TextAreaWrapper>
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        rows="5"
        cols="50"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={handleBlur}
        className={isFilled ? "filled" : ""}
      />
    </TextAreaWrapper>
  );
}
