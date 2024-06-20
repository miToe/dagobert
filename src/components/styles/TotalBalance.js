import styled from "styled-components";
import { GreyBox } from "@/src/components/styles/StyledGreyBox";

export const TotalBalance = styled(GreyBox)`
    border-radius: 16px;

    span {
    display: block;
    margin: 10px;

    &:last-child {
      font-weight: bold;
      text-align: right;
      font-size: 32px;
      margin-bottom: 20px;
    }
  }
`;
