import styled from "styled-components";

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const FilterContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 25px;
    border-radius: 12px;
    width: 40%;
    z-index: 1010;
`;

export const FilterSection = styled.div`
    margin-top: 25px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 35px;
`;




