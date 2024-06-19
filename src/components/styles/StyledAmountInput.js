import styled from 'styled-components';

export const AmountWrapper = styled.div`
    display: flex;
    height: 98px;
    background-color: var(--neutrals-light-gray);
    border-radius: var(--border-radius);
`;

export const AmountLabel = styled.label`
  display: flex;
  margin: 16px;
  font-size: 14px;

`;

export const AmountInputField = styled.input`
  width: 100%;
  font-size: 32px;
  font-weight: 600;
  text-align: right;
  border: none;
  background-color: var(--neutrals-light-gray);
  font-family: 'Outfit', sans-serif;
    
  &::placeholder {
      color: var(--neutrals-gray);
  }

  &:not(:placeholder-shown) {
      color: var(--neutrals-dark-gray);
  }
`;
