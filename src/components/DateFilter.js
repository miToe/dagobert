import {
  DateFilterGrid,
  DateInputLabel,
  DateInput,
  CalendarWrapper,
  InputWrapper,
  DateIconWrapper,
} from "@/src/components/styles/DateFilterStyled";

import SVGIcon from "@/src/components/SVGIcon";
import { useRef, useEffect } from "react";

export default function DateFilter({ dateFrom, dateUntil, onDateChange }) {
  const dateFromRef = useRef(null);
  const dateUntilRef = useRef(null);

  const handleIconClick = (id) => {
    if (id === "dateFrom") {
      dateFromRef.current.focus();
      dateFromRef.current.showPicker();
    } else if (id === "dateUntil") {
      dateUntilRef.current.focus();
      dateUntilRef.current.showPicker();
    }
  };

  const handleOutsideClick = (event) => {
    if (
      dateFromRef.current &&
      !dateFromRef.current.contains(event.target) &&
      dateUntilRef.current &&
      !dateUntilRef.current.contains(event.target)
    ) {
      dateFromRef.current.blur();
      dateUntilRef.current.blur();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <h4>Date</h4>
      <DateFilterGrid>
        <CalendarWrapper>
          <DateInputLabel>From:</DateInputLabel>
          <InputWrapper>
            <DateInput
              id="dateFrom"
              ref={dateFromRef}
              type="date"
              value={dateFrom}
              onChange={(event) => onDateChange("dateFrom", event.target.value)}
            />
            <DateIconWrapper onClick={() => handleIconClick("dateFrom")}>
              <SVGIcon iconName={"calendar"} color="var(--primary-500)" />
            </DateIconWrapper>
          </InputWrapper>
        </CalendarWrapper>
        <CalendarWrapper>
          <DateInputLabel>To:</DateInputLabel>
          <InputWrapper>
            <DateInput
              id="dateUntil"
              ref={dateUntilRef}
              type="date"
              value={dateUntil}
              onChange={(event) =>
                onDateChange("dateUntil", event.target.value)
              }
            />
            <DateIconWrapper onClick={() => handleIconClick("dateUntil")}>
              <SVGIcon iconName={"calendar"} color="var(--primary-500)" />
            </DateIconWrapper>
          </InputWrapper>
        </CalendarWrapper>
      </DateFilterGrid>
    </div>
  );
}
