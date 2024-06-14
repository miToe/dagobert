import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  padding: 1px;
  border-radius: 10px;
  border: 2px solid #ffffff; /* White border */
  max-width: 300px;
  width: 100%;
  align-self: center;
`;

export const Label = styled.label`
  font-size: 14px;
  color: var(--neutrals-dark-gray);

  margin-bottom: 5px;
`;

export const Textarea = styled.textarea`
  font-size: 16px;
  padding: 8px; /* Adjust padding if needed */
  border: 1px solid #c5c5c5; /* Thin border */
  border-radius: 5px;
  color: var(--neutrals-dark-gray);
  background-color: white;
  height: 100px;
  transition: border-color 0.2s, background-color 0.2s;
  resize: none;
  & ::placeholder {
    color: var(--neutrals-gray);
  }
  & ::-webkit-input-placeholder {
    color: var(--neutrals-gray);
  }
`;
