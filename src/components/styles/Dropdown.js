import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
`;

export const DropdownLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
`;

export const DropdownButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  &:hover {
    background-color: #3e8e41;
  }
  &:focus {
    outline: 3px solid #3e8e41;
  }

  &.has-error {
    border: 2px solid red;
  }
`;

export const DropdownMenu = styled.div`
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  max-height: 200px;
  overflow-y: auto;
`;

export const DropdownItem = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
  &[aria-selected="true"] {
    background-color: #ddd;
  }
  &:focus {
    background-color: #ddd;
    outline: none;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 8px;
`;
