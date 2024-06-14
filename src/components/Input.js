import { useState } from "react";
import { Label, Textarea } from "/src/components/styles/InputField.js";

export default function Input({ label, name, placeholder }) {
  const [isFilled, setIsFilled] = useState(false);

  function handleBlur(event) {
    setIsFilled(event.target.value !== "");
  }

  return (
    <>
      <Label htmlFor={name}>{label}</Label>

      <Textarea
        rows="5"
        cols="50"
        id={name}
        name={name}
        placeholder={placeholder}
        onBlur={handleBlur}
        className={isFilled ? "filled" : ""} //className is used to apply different styles when the textarea is filled
      />
    </>
  );
}
