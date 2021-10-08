import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MainMenu from './MainMenu';

export default function AppHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <MainMenu />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Karangos
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}