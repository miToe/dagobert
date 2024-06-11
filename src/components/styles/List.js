import styled from "styled-components";
import Link from "next/link";

export const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: #667080;
    width: 90%;
    margin: 2rem auto 0 auto;
`;

export const StyledTitle = styled.h1`
    font-size: 24px;
    font-weight: 600;
`;

export const StyledList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    list-style: none;
`;

export const StyledLink = styled(Link)`
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    color: #667080;
`;

export const LeftBlock = styled.div`
    display: flex;
    align-items: center;
    gap: .7rem;
`;

export const IconWrapper = styled.div`
    background: #004666;
    border-radius: 50%;
    height: 48px;
    width: 48px;
    display: flex;
    justify-content: center;
`;

export const CategoryAndDate = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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