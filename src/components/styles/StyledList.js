import styled from "styled-components";
import Link from "next/link";

export const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    color: #667080;
    width: 100%;
`;

export const Headline = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    width: 100%;
    overflow: hidden; /* Ensure the shadow doesn't overflow */
    box-shadow: 0px 10px 20px rgba(255, 255, 255, 1.5); /* Regular box shadow */
`;

export const StyledTitle = styled.h1`
    display: flex;
    justify-content: start;
    font-size: 24px;
    font-weight: 600;
    margin-top: 1rem;
`;

export const StyledList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: .7rem;
    list-style: none;
`;

export const StyledLink = styled(Link)`
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    color: #667080;
    background-color: white;
    padding: 10px 20px;
    border: 1px solid var(--neutrals-light-gray);
    border-radius: var(--border-radius);
    transition: box-shadow 0.2s, background-color 0.6s;

    &:hover {
        background-color: var(--highlight-50);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
`;


export const LeftBlock = styled.div`
    display: flex;
    align-items: center;
    gap: .7rem;
`;

export const IconWrapper = styled.div`
    background-color: ${props => props.$backgroundColor};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`;


export const CategoryAndDate = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 85%;
`;

export const StyledCategory = styled.span`
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
`;

export const StyledDate = styled.span`
    font-size: 16px;
`;

export const RightBlock = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledAmount = styled.span`
    font-size: 16px;
    font-weight: 400;
`;

export const SearchFilterWrapper = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
`;