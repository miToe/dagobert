import {DateFilterGrid, DateInputLabel, DateInput} from "@/src/components/styles/DateFilteredStyled"

export default function DateFilter({ dateFrom, dateUntil, onDateChange }) {
  return (
    <div>
      <h4>Date</h4>
      <DateFilterGrid>
        <div>
        <DateInputLabel>From:</DateInputLabel>
        <DateInput
          type="date"
          value={dateFrom}
          onChange={(event) => onDateChange("dateFrom", event.target.value)}
        />
        </div>
        <div>
        <DateInputLabel>To:</DateInputLabel>
        <DateInput
          type="date"
          value={dateUntil}
          onChange={(event) => onDateChange("dateUntil", event.target.value)}
        />
    </div>
      </DateFilterGrid>
    </div>
  );
}
