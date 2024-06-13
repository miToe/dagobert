import {DateInputContainer, DateInputLabel, DateInput} from "@/src/components/styles/DateFilteredStyled"

export default function DateFilter({ dateFrom, dateUntil, onDateChange }) {
  return (
    <div>
      <h4>Date</h4>
      <DateInputContainer>
        <DateInputLabel>From:</DateInputLabel>
        <DateInput
          type="date"
          value={dateFrom}
          onChange={(event) => onDateChange("dateFrom", event.target.value)}
        />
      </DateInputContainer>
      <DateInputContainer>
        <DateInputLabel>Until:</DateInputLabel>
        <DateInput
          type="date"
          value={dateUntil}
          onChange={(event) => onDateChange("dateUntil", event.target.value)}
        />
      </DateInputContainer>
    </div>
  );
}
