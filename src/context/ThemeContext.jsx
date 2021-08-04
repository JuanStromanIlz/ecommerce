import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styled-components/GlobalStyles';
import theme from '../theme';

function ThemeContext({children}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div id='mask'></div>
      {children}
    </ThemeProvider>
  );
}

export default ThemeContext;