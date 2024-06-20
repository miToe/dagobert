import { css } from "styled-components";

const sizes = {
  xs: "480",
  sm: "768",
  md: "1024",
  lg: "1280",
  xl: "1440",
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

export default media;
