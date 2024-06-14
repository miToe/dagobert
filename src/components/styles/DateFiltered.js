import styled from 'styled-components';

export const DateFilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px; 
`;

export const DateInputLabel = styled.label`
    display: block;
    margin-top: 12px;
    margin-bottom: 6px;
    font-size: 14px;
    color: var(--neutrals-dark-gray); 
`;

export const DateInput = styled.input`
    width: 100%;
    height: 47px;
    appearance: none;
    padding: 8px;
    font-size: 16px;
    color: var(--neutrals-dark-gray); 
    border: 1px solid var(--neutrals-mid-gray); 
    border-radius: 6px;  
    text-transform: uppercase;
    font-family: 'Inter', sans-serif; 
`;

export const CalendarWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 24px; /* Adjust width of the calendar icon wrapper */
  height: 24px; /* Adjust height of the calendar icon wrapper */

  input[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  /* Style the calendar icon */
  &:before {
    content: '\1F4C5'; /* Unicode for calendar icon */
    font-size: 16px;
    color: var(--primary-500); /* Set the color of the calendar icon */
  }
`;
