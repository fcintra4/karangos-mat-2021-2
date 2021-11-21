import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  menuItem: {
    padding: 0
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    padding: '10px'
  }
}))


export default function MainMenu() {

  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem className={classes.menuItem} onClick={handleClose}>
          <Link className={classes.link} to="/clientes">Listagem de clientes</Link>
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleClose}>
          <Link className={classes.link} to="/clientes/new">Cadastrar novo cliente</Link>
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleClose}>
          <Link className={classes.link} to="/karangos">Listagem de Karangos</Link>
        </MenuItem>
        
      </Menu>
    </div>
  );
}
