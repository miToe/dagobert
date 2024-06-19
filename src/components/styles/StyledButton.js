import styled from "styled-components";

export const StyledButton = styled.button`
    font-size: 16px;
    padding: 10px 20px;
    border-radius: var(--border-radius-small);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    ${(props) => props.$variant === "primary" && `
    background-color: var(--primary-500);
    color: var(--neutrals-white);

    &:hover {
      background-color: var(--primary-700);
    }
  `}

    ${(props) => props.$variant === "secondary" && `
    background-color: var(--primary-50);
    border: 2px solid var(--primary-500);
    color: var(--primary-500);

    &:hover {
      background-color: var(--primary-100);
    }
  `}
`;

export const IconWrapper = styled.span`
    display: inline-flex;
    ${(props) => props.start && "margin-right: 0.5rem;"}
    ${(props) => props.end && "margin-left: 0.5rem;"}
`;