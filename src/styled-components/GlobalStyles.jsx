import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    box-sizing: border-box;
    height: 100%;
    font-size: 62.5%;
  }
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;  /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;
    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;
    /* Support for IE. */
    font-feature-settings: 'liga';
  }
  body {
    margin: 0;
    padding: 0;
    font-size: 1.4rem;
    font-family: 'Lato', sans-serif;
    h1, h2, h3, h4, h5, h6, p, a {
      margin: 0;
      padding: 0;
      font-weight: inherit;
      font-style: inherit;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }
  }
  #mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    opacity: 0;
    transition: .5s cubic-bezier(0.47, 0, 0.75, 0.72);
    background: ${props => props.theme.black};
    z-index: 10;
  }
  ${'' /* body::-webkit-scrollbar {
    width: .4rem;
  }
  body::-webkit-scrollbar-track {
    background: transparent;
  }
  body::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.black};
  } */}
  @media (min-width: 920px) {
    body {
      font-size: 1.3rem;
    }
  }
`;

export default GlobalStyles;