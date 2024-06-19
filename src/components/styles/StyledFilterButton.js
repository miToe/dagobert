import styled from "styled-components";

export const StyledFilterButton = styled.button`
    background-color: var(--primary-500);
    border: none;
    border-radius: var(--border-radius-small);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 48px;
    min-width: 55px;

    svg {
        fill: white;
    }
`;