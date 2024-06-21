import styled from "styled-components";

export const BackToTopButton = styled.button`
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 50px;
    height: 50px;
    background-color: var(--primary-200);
    color: var(--neutrals-white);
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    z-index: 1000;

    &:hover {
        background-color: var(--primary-500);
    }
`;
