import styled from "styled-components";
import { GreyBox } from "@/src/components/styles/StyledGreyBox";

export const TotalBalance = styled(GreyBox)`
    border-radius: var(--border-radius-big);
    font-weight: 600;
    font-size: 18px;

    span {
    display: block;
    margin: 10px;

    &:last-child {
      font-weight: 600;
      text-align: right;
      font-size: 32px;
      margin-bottom: 20px;
    }
  }
`;
