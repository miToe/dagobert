import styled from "styled-components";

export const AlertWrapper = styled.div`
    position: fixed;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 200;
`;

export const AlertBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    background-color: white;
    border-radius: 20px;
    height: 186px;
    width: 80%;

    span {
        display: flex;
        justify-content: center;
        text-align: center;
    }
`;

export const AlertIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--feedback-success);
    border-radius: 50%;
    height: 60px;
    width: 60px;

    svg {
        fill: white;
        transform: scale(1.5);
    }
`;

export const AlertMessage = styled.span`
    padding: 0 20px;
    font-weight: 500;
    font-size: 16px;
`;