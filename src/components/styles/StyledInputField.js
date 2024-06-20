import styled from "styled-components";

export const TextAreaWrapper = styled.div`
display: flex;
flex-direction: column;
`;

export const Label = styled.label`
  color: var(--neutrals-dark-gray);
  margin-bottom: 10px;
  display: block;
  font-size: 14px;
  font-weight: 400;
`;

export const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid var(--neutrals-mid-gray);
  border-radius: var(--border-radius-small);
  color: var(--neutrals-dark-gray);
  font-family: "Outfit", sans-serif;
    font-size: 16px;

  &:focus {
    outline: none;
    border-color: var(--primary-500);
  }

  &::placeholder {
    color: var(--neutrals-gray);
  }
  &::-webkit-input-placeholder {
    color: var(--neutrals-gray);
  }
`;
