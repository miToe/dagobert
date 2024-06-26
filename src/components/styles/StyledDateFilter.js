import styled from "styled-components";

export const DateFilterGrid = styled.div`
    display: block;
    flex-wrap: wrap;
`;

export const DateInputLabel = styled.label`
    display: block;
    font-size: 14px;
    color: var(--neutrals-dark-gray);
    margin-bottom: 10px;
`;

export const DateInput = styled.input`
    width: 100%;
    height: 47px;
    padding: 8px;
    appearance: none;
    color: var(--neutrals-dark-gray);
    border: 1px solid var(--neutrals-mid-gray);
    border-radius: var(--border-radius-small);
    text-transform: uppercase;
    font-family: "Outfit", sans-serif;
    font-size: 16px;
    background: none;

    &::-webkit-calendar-picker-indicator {
        cursor: pointer;
        opacity: 0;
    }

    &:focus {
        outline: none;
        border: 1px solid var(--primary-500);
    }
`;

export const CalendarWrapper = styled.div`
    position: relative;
    display: inline-block;
    padding: 5px;
    width: 50%;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const DateIconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate3d(-12px, -50%, 0);
  cursor: pointer;
`;
