import styled from "styled-components";

export const AddLinkWrapper = styled.div`
  background: var(--primary-500);
  border-radius: var(--border-radius-small);
  margin: 10px;

  a {
    padding: 10px;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--neutrals-white);
    border-radius: var(--border-radius-small);
    text-decoration: none;

    &:hover {
      background: var(--primary-900);
    }

    svg {
      fill: var(--neutrals-white);
    }
  }
`;
