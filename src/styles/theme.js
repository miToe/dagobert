import { createGlobalStyle } from "styled-components";

const ThemeColors = createGlobalStyle`
    :root {
        --neutrals-white: #FFFFFF;
        --neutrals-light-gray: #EEF1f4;
        --neutrals-mid-gray: #bac0ca;
        --neutrals-gray: #a3a9b3;
        --neutrals-dark-gray: #667080;
        --neutrals-black-gray: #363636;

        --primary-50: #EFF9FF;
        --primary-100: #DEF2FF;
        --primary-200: #B6E6FF;
        --primary-300: #75D5FF;
        --primary-400: #2CC0FF;
        --primary-500: #14B4FF;
        --primary-600: #0086D4;
        --primary-700: #006BAB;
        --primary-800: #005A8D;
        --primary-900: #064B74;
        --primary-950: #042F4D;

        --secondary-50: #FFF0FB;
        --secondary-100: #FFE3F9;
        --secondary-200: #FFC6F3;
        --secondary-300: #FF98E7;
        --secondary-400: #FF59D4;
        --secondary-500: #FF28BF;
        --secondary-600: #FE14A5;
        --secondary-700: #DE007F;
        --secondary-800: #B70068;
        --secondary-900: #980359;
        --secondary-950: #5E0031;

        --highlight-50: #EDFDFE;
        --highlight-100: #D1F9FC;
        --highlight-200: #A8F2F9;
        --highlight-300: #6CE6F4;
        --highlight-400: #29D0E7;
        --highlight-500: #0DB3CD;
        --highlight-600: #0E94B2;
        --highlight-700: #12738C;
        --highlight-800: #185D72;
        --highlight-900: #194E60;
        --highlight-950: #0A3342;

        --tertiary-50: #FEFDE8;
        --tertiary-100: #FFFCC2;
        --tertiary-200: #FFF788;
        --tertiary-300: #FFE944;
        --tertiary-400: #FED814;
        --tertiary-500: #FED814;
        --tertiary-600: #CD9301;
        --tertiary-700: #A46804;
        --tertiary-800: #87520C;
        --tertiary-900: #734310;
        --tertiary-950: #432205;

        --feedback-success: #04BF2D;
        --feedback-warning: #ffcd1b;
        --feedback-error: #fc1358;

    }

`;

export default ThemeColors;