import styled from "styled-components";

export const ModalWrapper = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
`;

export const ModalBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

export const ModalMessage = styled.span`
    padding: 20px 20px 0 20px;
    font-size: 18px;
    font-weight: 600;
`;

export const ModalHint = styled.span`
    padding: 0 20px;
    font-weight: 500;
    font-size: 14px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    width: 100%;

    button {
        width: 50%;
        height: 48px;

        &:first-child {
            background-color: var(--primary-100);
            color: var(--primary-500);
            font-weight: 600;
            border-radius: 0 0 0 20px;
        }

        &:last-child {
            background-color: var(--primary-500);
            color: white;
            font-weight: 600;
            border-radius: 0 0 20px 0;
        }
    }
`;