import styled from "styled-components";

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FilterContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px;
    border-radius: 12px;
    width: 40%;
`;

export const FilterSection = styled.div`
    margin-top: 16px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

export const DateInputContainer = styled.div`
    margin-bottom: 10px;
`;

export const DateInputLabel = styled.label`
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  color: var(--neutrals-dark-gray);
`;

export const DateInput = styled.input`
    width: 100%;
    appearance: none;
    padding: 8px 8px 8px 8px;
    font-size: 16px;
    color: var(--neutrals-dark-gray);
    border: 1px solid var(--neutrals-mid-gray);
    border-radius: 6px;
    text-transform: uppercase;
`;

export const CalendarWrapper = styled.div`
    input[type="date"]::-webkit-calendar-picker-indicator {
display: none;
webkit-appearance: none;
`



