import { useState } from "react";
import {
  InputContainer,
  Label,
  Textarea,
} from "/src/components/styles/InputStyle.js";

export default function Input({ label, placeholder }) {
  const [isFilled, setIsFilled] = useState(false);

  const handleBlur = (event) => {
    setIsFilled(event.target.value !== "");
  };

  return (
    <InputContainer>
      <Label>{label}</Label>
      <Textarea
        placeholder={placeholder}
        onBlur={handleBlur}
        className={isFilled ? "filled" : ""}
      />
    </InputContainer>
  );
}
