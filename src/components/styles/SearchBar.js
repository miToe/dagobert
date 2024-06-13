import styled from "styled-components";

export const SearchBarContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  &:hover input {
    outline: 1px solid var(--primary-500);
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  display: flex;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  text-indent: 32px;
  border-radius: var(--border-radius-small);
  background: var(--neutrals-light-gray);
  border: none;

  &::placeholder,
  &::-webkit-input-placeholder {
    color: var(--neutrals-mid-gray);
  }

  &:focus {
    outline: 1px solid var(--primary-500);
  }

  &[aria-expanded="true"] {
    border-radius: var(--border-radius-small) var(--border-radius-small) 0 0;
    outline: 1px solid var(--primary-500);
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    svg {
      fill: var(--primary-500);
    }
  }
`;

export const SuggestionsList = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
  position: absolute;
  background: white;
  border-top: none;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1;
  transform: translate(0, 0px);
  box-shadow: 0 0 0 1px var(--primary-500);
  border-radius: 0 0 var(--border-radius-small) var(--border-radius-small);
`;

export const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-100);
  }
  &[aria-selected="true"] {
    background-color: var(--primary-200);
    pointer-events: none;
  }
  &:focus {
    background-color: var(--primary-200);
    outline: none;
  }
`;

export const Highlight = styled.span`
  background-color: var(--primary-200);
`;
