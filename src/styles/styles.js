import { createGlobalStyle } from "styled-components";
import { Inter } from "next/font/google";

export const interFont = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});
console.log("interFont", interFont);

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    :root {
        --max-width: 100%;
        --border-radius: 12px;
        --font-inter: "Inter";
        --h1-font-size: 2em;
        --h2-font-size: 1.75em;
        --h3-font-size: 1.5em;
        --h4-font-size: 1em;
    }

    body {
        font-family: ${interFont.style.fontFamily};
        color: var(--neutrals-dark-gray)
    }

    h1 {
        padding-top: 16px;
        font-weight: 700; /*bold*/
    }
    
    h2 {
        padding-top: 16px;
        font-weight: 600; /*semibold*/
    }

    h3 {
        padding-top: 16px;
        font-weight: 600; /*semibold*/
    }

    h4 {
        font-weight: 500; /*medium*/
    }
`

export default GlobalStyle;