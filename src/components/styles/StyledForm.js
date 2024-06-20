import styled from "styled-components";

export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    gap: 1.5rem;
`;

export const Headline = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 1.5rem;
`;

export const StyledTitle = styled.h2`
    font-size: 18px;
    font-weight: 600;

`;

export const AmountInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
`;

export const AmountError = styled.div`
    color: var(--feedback-error);
    font-size: 12px;
    margin-top: 2.5px;
`;
