import styled from "styled-components";
import { GreyBox } from "@/src/components/styles/StyledGreyBox";

export const TotalBalance = styled(GreyBox)`
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
