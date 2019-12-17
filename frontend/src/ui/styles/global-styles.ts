import { createGlobalStyle } from 'styled-components';

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

    margin:0;
    padding: 0;

    line-height:1;

    font-size:14px;
  }
`;