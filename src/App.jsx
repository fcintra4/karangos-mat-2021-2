import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { yellow, pink, grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';

import AppHeader from './ui/AppHeader';
import AppFooter from './ui/AppFooter';
import ClientesList from './routed/ClienteList';
import ClientesForm from './routed/ClientesForm';
import KarangosList from './routed/KarangosList'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[500]
    },
    secondary: {
      main: pink[500]
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        paddingBottom: '40px',
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        color: theme.palette.text.primary
      }}>
        <BrowserRouter>
          <AppHeader/>
          <Box component='main' sx={{ margin: '20px' }}>
            <Switch>
              <Route path='/clientes' exact>
                <ClientesList/>
              </Route>
              <Route path='/clientes/new'>
                <ClientesForm/>
              </Route>
              <Route path='/clientes/:id'>
                <ClientesForm/>
              </Route>
              <Route path='/karangos'>
                <KarangosList/>
              </Route>
            </Switch>
          </Box>
          <AppFooter/>
        </BrowserRouter>
      </Box>
    </ThemeProvider>

  );
}

export default App;
