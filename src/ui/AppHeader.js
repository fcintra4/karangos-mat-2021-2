import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MainMenu from './MainMenu'
import logo from '../assets/karangos-logo-300px.png'

export default function AppHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ padding: '8px 0'}} enableColorOnDark>
        <Toolbar>
          <MainMenu />
          <img src={logo} alt="Logotipo Karangos" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}