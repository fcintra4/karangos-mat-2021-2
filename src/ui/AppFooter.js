import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CoffeeIcon from '@mui/icons-material/Coffee';

const useStyles = makeStyles(theme => {
  console.log(theme)
  return {
    box: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      height: '40px',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    typog: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', width: '100%'
    },
    link: {
      color: theme.palette.secondary.light,
      marginLeft: '4px',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
})

export default function AppFooter() {
  const styles = useStyles()
  return (
    <Box sx={{ flexGrow: 1 }} component='footer'
      className={styles.box}>
      <AppBar className={styles.toolbar} position="static">
        <Toolbar variant="dense">
          <Typography variant="caption" color="inherit" component="div"
            className={styles.typog}>
            Desenvolvido com <CoffeeIcon fontSize='small'/> por: <a className={styles.link}
               href="mailto:kefflen@outlook.com">kefflen</a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

