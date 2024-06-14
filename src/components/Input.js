import { useState } from "react";
import {
  InputContainer,
  Label,
  Textarea,
} from "/src/components/styles/InputStyle.js";

export default function Input({ label, name, placeholder }) {
  const [isFilled, setIsFilled] = useState(false);

  function handleBlur(event) {
    setIsFilled(event.target.value !== "");
  }

  return (
    <InputContainer>
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        name={name}
        placeholder={placeholder}
        onBlur={handleBlur}
        className={isFilled ? "filled" : ""} //className is used to apply different styles when the textarea is filled
      />
    </InputContainer>
  );
}
