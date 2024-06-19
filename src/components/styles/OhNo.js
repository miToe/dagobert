import styled from "styled-components";

export const OhNoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
  z-index: 990;

  span {
    margin-top: 0.75rem;
  }
`;
