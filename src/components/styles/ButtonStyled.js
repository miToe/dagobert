import styled from "styled-components";

export const ButtonStyled = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  ${(props) => props.$variant === 'primary' && `
    background-color: var(--primary-500);
    color: var(--neutrals-white);

    &:hover {
      background-color: var(--primary-700);
    }
  `}

  ${(props) => props.$variant === 'secondary' && `
    background-color: var(--primary-50);
    border: 2px solid var(--primary-500);
    color: var(--primary-500);

    &:hover {
      background-color: var(--primary-100);
    }
  `}

  ${(props) => props.$variant === 'iconOnly' && `
    background: none;
    border: none;
    padding: 0;
    color: inherit; // or any color you prefer

    &:hover {
      color: var(--primary-700); // or any hover effect you prefer
    }
  `}
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  ${(props) => props.start && 'margin-right: 0.5rem;'}
  ${(props) => props.end && 'margin-left: 0.5rem;'}
`;