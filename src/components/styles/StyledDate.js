import styled from "styled-components";

export const DateContainer = styled.div`
    display: block;
`;

export const DateInputLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: var(--neutrals-dark-gray);
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
    width: 100%;
`;

export const DateIconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate3d(-12px, -50%, 0);
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
    color: var(--feedback-error);
    font-size: 12px;
    margin-top: 8px;
`;
