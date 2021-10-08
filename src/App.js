import {BrowserRouter, Switch, Route} from 'react-router-dom'
import AppHeader from './ui/AppHeader'
import AppFooter from './ui/AppFooter'
import ClientList from './routed/ClientList'
import ClientForm from './routed/ClientForm'
import { ThemeProvider, createTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { yellow, pink, grey } from '@mui/material/colors'

const customTheme  = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: yellow[500],
    },
    secundary: {
      main: pink[500],
    },
    background:{
      default: grey[800],
      paper: grey[600]
    },
    text:{
      primary: grey[50],
      secondary: grey[300],
      disabled: grey[600]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

    }
  }
})

function App() {
  return (
      <ThemeProvider theme={customTheme}>
        <Box sx={{ height: '100vh', backgroundColor: customTheme.palette.background.default, color: customTheme.palette.primary }}>
        <BrowserRouter>
        <AppHeader/>
        <Box component="main" sx={{margin: '20px'}}>
          <Switch>
            <Route path="/clientes">
              <ClientList/>
            </Route>
            <Route path="/clientes/new">
              <ClientForm/>
            </Route>
          </Switch>

          </Box>
        <AppFooter/>
        </BrowserRouter>
        </Box>
      </ThemeProvider>
    
    
  )
}

export default App;
