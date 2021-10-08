import { BrowserRouter } from 'react-router-dom'
import AppHeader from './ui/AppHeader'
import AppFooter from './ui/AppFooter'
import { createTheme, ThemeProvider } from '@mui/material';
import { yellow, pink, grey } from '@mui/material/colors';

const customTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: yellow[500]
    },
    secondary: {
      main: pink[500]
    },
    background: {
      default: grey[900],
      paper: grey[800]
    },
    text: {
      primary: grey[50],
      secondary: grey[300],
      disabled: grey[600]
    }
  },
});

function App() {
  console.log(customTheme.palette)
  return (
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <AppHeader />
        <AppFooter />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
