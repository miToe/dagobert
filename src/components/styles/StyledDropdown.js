import styled from "styled-components";

export const DropdownContainer = styled.div`
    position: relative;
    display: block;
    margin-bottom: 20px;
`;

export const DropdownLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
`;

export const IconWrapper = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DropdownButton = styled.button`
    position: relative;
    background-color: var(--neutrals-white);
    padding: 13px 12px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    text-align: left;
    border: 1px solid var(--neutrals-dark-gray);
    border-radius: var(--border-radius-small);

    &:hover {
        border-color: var(--primary-500);
    }

    &[aria-expanded="true"],
    &:focus {
        border: 1px solid var(--primary-500);
    }

    &[aria-expanded="true"] {
        border-bottom: none;
        border-radius: var(--border-radius-small) var(--border-radius-small) 0 0;
    }

    &[aria-expanded="true"] ${IconWrapper} {
        transform: rotate(180deg);
    }

    &.has-error {
        border: 2px solid var(--feedback-error);
    }
`;

export const DropdownMenu = styled.div`
    display: block;
    position: absolute;
    background-color: var(--neutrals-white);
    min-width: 100%;
    max-height: 200px; /* Adjust this height to show 4 options */
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    overflow-y: auto;
    border: 1px solid var(--primary-500);
    border-radius: 0 0 var(--border-radius-small) var(--border-radius-small);
`;

export const DropdownItem = styled.div`
    color: var(--primary-dark-gray);
    padding: 12px 16px;
    text-decoration: none;
    display: block;
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

export const ErrorMessage = styled.div`
    color: var(--feedback-error);
    font-size: 12px;
    margin-top: 8px;
`;
