import { Global } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={{
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      body: {
        fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif`,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      'html, body, #root': {
        height: '100%',
        width: '100%',
      },
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
      button: {
        cursor: 'pointer',
        border: 'none',
        fontFamily: 'inherit',
      },
      'input, textarea, select': {
        fontFamily: 'inherit',
      },
    }}
  />
);

export default GlobalStyles;
