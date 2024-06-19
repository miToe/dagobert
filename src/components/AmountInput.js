import {AmountWrapper, AmountLabel, AmountInputField} from "@/src/components/styles/StyledAmountInput";

export default function AmountInput ({ id, name, value, onChange, onKeyDown, placeholder }) {
  return (
    <AmountWrapper>
      <AmountLabel>Amount</AmountLabel>
      <AmountInputField
        id={id}
        name={name}
        type="number"
        step="0.01"
        min="0"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
    </AmountWrapper>
  );
}

