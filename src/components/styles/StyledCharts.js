import styled from "styled-components";
import media from "@/src/styles/breakpoints";

export const ChartsWrapper = styled.div`
  display: flex;
`;

export const ChartSection = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > div {
    padding: 20px;
    border-radius: 16px;
    margin-bottom: 20px;
    background: var(--primary-50);
    width: 100%;

    &:last-child{
      margin-bottom:0;
    }

  }

  ${media.xl`
    flex-wrap:nowrap;
    gab:1rem;

    > div{
         width:calc(50% - .5rem);
    }
  `}
`;

export const BalanceSection = styled.div`
  margin-bottom: 20px;
`;

export const SummarySection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 40px;
  width: 100%;
  gap: 10px;
`;

export const Balance = styled.div`
  font-size: 16px;
  border-radius: var(--border-radius-small);
  width: calc(50% - 10px);
  padding: 10px;

  &:first-child {
    background: var(--primary-200);
  }
  &:last-child {
    background: var(--secondary-100);
  }

  span {
    display: block;

    &:last-child {
      font-weight: 500;
      text-align: right;
      font-size: 22px;
    }
  }
`;

export const CategoryName = styled.text`
  font-size: 14px;
  font-weight: 500;
  fill: var(--neutrals-dark-gray);
`;

export const ValueText = styled.text`
  font-size: 16px;
  font-weight: 600;
  fill: var(--neutrals-dark-gray);
`;

export const PieChartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  width: 100%;
  flex-wrap:wrap;

  ${media.xl`
    flex-wrap:wrap;
    
    div{
         width:100%!important;
    }
    }
  `}
`;

export const LegendList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  width:100%;
  flex-wrap: wrap;
  
  ${media.xl`
    width: 100%;
  `}
`;

export const LegendItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-right: 5px;
  width: 50%;


  ${media.lg`
      width: calc(100% / 3);
  `}
`;

export const LegendColor = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 8px;
  background-color: ${({ color }) => color};
`;
