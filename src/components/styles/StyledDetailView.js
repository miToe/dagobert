import styled from "styled-components";
import Link from "next/link";

export const DetailViewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    color: #667080;
`;

export const Headline = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 30px;
`;

export const BacklinkWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledLink = styled(Link)`
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    color: #667080;
`;

export const StyledTitle = styled.h2`
    font-size: 18px;
    font-weight: 600;
`;

export const GroupedIcons = styled.div`
    display: flex;
    gap: .5rem;
`;

export const StyledList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    list-style: none;
    width: 100%;
`;

export const StyledDetailAmount = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 98px;
    padding: 1rem;
    background-color: var(--highlight-500);
    color: white;
    border-radius: var(--border-radius-big);
`;

export const StyledCategoryTitle = styled.span`
    font-weight: 400;
`;

export const StyledAmount = styled.span`
    display: flex;
    justify-content: end;
    font-size: 32px;
    font-weight: 700;
`;

export const StyledDetailItem = styled.li`
    display: flex;
    justify-content: space-between;
    height: 54px;
    padding: 1rem;
    background-color: var(--highlight-50);
    color: var(--neutrals-dark-gray);
    border-radius: var(--border-radius-big);
`;

export const StyledDetailDescription = styled.li`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    height: auto;
    padding: 1rem;
    background-color: var(--highlight-50);
    color: var(--neutrals-dark-gray);
    border-radius: var(--border-radius-big);
`;
