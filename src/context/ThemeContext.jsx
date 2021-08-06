import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styled-components/GlobalStyles';
import theme from '../theme';

function ThemeContext({children}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}

export default ThemeContext;