import {
  CalendarWrapper, DateContainer,
  DateIconWrapper,
  DateInput,
  DateInputLabel, ErrorMessage
} from "@/src/components/styles/StyledDate";
import SVGIcon from "@/src/components/SVGIcon";
import { useEffect, useRef } from "react";

export default function Date({ date, onDateChange}) {
  const dateRef = useRef(null);

  const handleIconClick = () => {
    dateRef.current.focus();
    dateRef.current.showPicker();
  };

  const handleOutsideClick = (event) => {
    if (dateRef.current && !dateRef.current.contains(event.target)) {
      dateRef.current.blur();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    onDateChange(value);
  };

  return (
    <DateContainer>
      <DateInputLabel>Date</DateInputLabel>
        <CalendarWrapper>
            <DateInput
              id="date"
              ref={dateRef}
              type="date"
              value={date}
              onChange={handleChange}
              />
            <DateIconWrapper onClick={handleIconClick}>
              <SVGIcon iconName={"calendar"} color="var(--primary-500)" />
            </DateIconWrapper>
        </CalendarWrapper>
    </DateContainer>
  );
}
