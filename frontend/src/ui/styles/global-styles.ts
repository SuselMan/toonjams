import { createGlobalStyle } from 'styled-components';
import { defaultBackgroundColor, defaultTextColor } from './colors';

export const GlobalStyle = createGlobalStyle`
  html {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
  }

  body {
    display:flex;
    flex-direction: column;

    background-color: ${defaultBackgroundColor};
    color: ${defaultTextColor};

    margin:0;
    padding: 0;

    line-height:1;

    font-size:14px;
  }
`;