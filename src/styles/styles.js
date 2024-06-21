import { createGlobalStyle } from "styled-components";
import { Outfit } from "next/font/google";

export const outfitFont = Outfit({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-outfit",
});

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    :root {
        --max-width: 100%;
        --border-radius-big: 16px;
        --border-radius: 12px;
        --border-radius-small: 6px;
        --font-outfit: "Outfit";
        --h1-font-size: 2em;
        --h2-font-size: 1.75em;
        --h3-font-size: 1.5em;
        --h4-font-size: 1em;
    }

    body {
        font-family: ${outfitFont.style.fontFamily};
        color: var(--neutrals-dark-gray);

        > div {
            width: 80%;
            margin: 0 auto;
        }
    }

    h1 {
        font-weight: 700; /*bold*/
    }

    h2 {
        font-weight: 600; /*semibold*/
    }

    h3 {
        font-weight: 600; /*semibold*/
    }

    h4 {
        font-weight: 500; /*medium*/
    }
`;

export default GlobalStyle;