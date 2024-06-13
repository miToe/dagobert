import { createGlobalStyle } from "styled-components";


const ThemeColors = createGlobalStyle`
    :root{
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
    :root[data-theme="dark"] {

        --neutrals-50: #0a0d0f;
        --neutrals-100: #141b1f;
        --neutrals-400: #526a7a;
        --neutrals-500: #668599;
        --neutrals-700: #a3b6c2;
        --neutrals-950: #f0f3f5;

        --primary-50: #00111a;
        --primary-100: #002333;
        --primary-200: #004666;
        --primary-300: #006999;
        --primary-400: #008bcc;
        --primary-500: #00aeff;
        --primary-600: #33beff;
        --primary-700: #66cfff;
        --primary-800: #99dfff;
        --primary-900: #ccefff;
        --primary-950: #e5f7ff;

        --secondary-50: #1a0012;
        --secondary-100: #330024;
        --secondary-200: #660047;
        --secondary-300: #99006b;
        --secondary-400: #cc008f;
        --secondary-500: #ff00b2;
        --secondary-600: #ff33c2;
        --secondary-700: #ff66d1;
        --secondary-800: #ff99e0;
        --secondary-900: #ffccf0;
        --secondary-950: #ffe5f7;

        --accent-50: #191500;
        --accent-100: #332a00;
        --accent-200: #655501;
        --accent-300: #987f01;
        --accent-400: #cba901;
        --accent-500: #fed401;
        --accent-600: #fedc34;
        --accent-700: #fee567;
        --accent-800: #feee9a;
        --accent-900: #fff6cc;
        --accent-950: #fffbe6;

        --feedback-success: #04BF2D;
        --feedback-warning: #ffcd1b;
        --feedback-error: #fc1358;

    }

`

export default ThemeColors;