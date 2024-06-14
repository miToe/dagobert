import {DateFilterGrid, DateInputLabel, DateInput, CalendarWrapper} from "@/src/components/styles/DateFiltered"

export default function DateFilter({ dateFrom, dateUntil, onDateChange }) {
  return (
    <div>
      <h4>Date</h4>
      <DateFilterGrid>
        <div>
         <DateInputLabel>From:</DateInputLabel>
          <CalendarWrapper>
        <DateInput
          type="date"
          value={dateFrom}
          onChange={(event) => onDateChange("dateFrom", event.target.value)}
        />
          </CalendarWrapper>
        </div>
        <div>
        <DateInputLabel>To:</DateInputLabel>
        <CalendarWrapper>
        <DateInput
          type="date"
          value={dateUntil}
          onChange={(event) => onDateChange("dateUntil", event.target.value)}
        />
      </CalendarWrapper>
    </div>
      </DateFilterGrid>
    </div>
  );
}
