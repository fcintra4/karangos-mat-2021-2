import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AppHeader from './ui/AppHeader'
import AppFooter from './ui/AppFooter'
import { createTheme, ThemeProvider } from '@mui/material'; //import ThemeProvider, tudo dentro dele entra com o theme definido
import { yellow, pink, grey } from '@mui/material/colors';
import Box from '@mui/material/Box'

import ClientesForm from './routed/ClientesForm'
import ClientesList from './routed/ClientesList'

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
      <ThemeProvider theme={customTheme}>
        <Box sx={{ height: '100vh', backgroundColor: customTheme.palette.background.default, color: customTheme.palette.text.primary }}>
        <BrowserRouter>
          <AppHeader />
          <Box component="main" sx={{ margin: '20px' }}>
            <Switch>

                
              <Route path="/clientes" exact>
                <ClientesList />
              </Route>

              <Route path="/clientes/new">
                <ClientesForm />
              </Route>

            </Switch>
          </Box>
          <AppFooter />
        </BrowserRouter>
        </Box>
      </ThemeProvider>
  );
}

export default App;
