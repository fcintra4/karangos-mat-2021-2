import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => {

  return {
    menuItem: {
      padding: 0
    },
    link: {
      color: theme.palette.text.primary,
      textDecoration: 'none',
      padding: '6px'
    }
  }
})

export default function MainMenu() {
  const styles = useStyles()
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
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
        </IconButton>
      <Menu
        className={styles.menuItem}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link className={styles.link} to='/clientes'>
            Clientes
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={styles.link} to='/clientes/new'>
              Cadastrar novos clientes
            </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
