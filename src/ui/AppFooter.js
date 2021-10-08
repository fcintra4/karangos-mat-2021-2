import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import CoffeeIcon from '@mui/icons-material/Coffee';


const useStyles = makeStyles(theme => ({
    box: {
        position:'fixed',
        bottom: 0,
        width: '100%',
    },
    toolbar:{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        height: '40px'
    },
    typog: {
        width: '100%',
        textAlign: 'center',
        height: '40px'
    },
    link :{
        color: theme.palette.secondary.light,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        }
    }
}))

export default function AppFooter() {
    const classes = useStyles()

return (
    <Box sx={{ flexGrow: 1}} component="footer" className={classes.box}>
      <AppBar position="static" className={classes.toolbar}>
        <Toolbar variant="dense">
          <Typography variant="caption" color="inherit" component="div" className={classes.typog}>
            Desenvolvido com <CoffeeIcon fontSize="small" /> <a className={classes.link} href="mailto:gabrielmijoler@hotmail.com">Gabriel Mijoler</a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}