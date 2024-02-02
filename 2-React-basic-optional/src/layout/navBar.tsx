import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, NavLink } from 'react-router-dom';

const pages = [ {title:'GITHUB List', link: '/list'}, {title:'Rick & Morty List', link: '/character-list'}];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    // console.log(event);
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  return (
    <AppBar position="static">
      <Container maxWidth="xl" >
        <Toolbar disableGutters >
          <AdbIcon sx={{ display: { xs: 'none', md: 'block' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"

            sx={{
              mr: 2,
              display: { xs: 'none', md: 'block' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LISTADO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'block', md: 'none', width: 1 }}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <NavLink               
                className={({ isActive }) => {
                  return isActive ? "is-active linkMenu " : "linkMenu"
                }}  
                key={index}   
                to={page.link} onClick={handleCloseNavMenu}>
                  <Typography textAlign="left">{page.title}</Typography>
                </NavLink>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'block', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'block', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block'} }}>
            {pages.map((page, index) => (
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "is-active linkMenu " : "linkMenu"
                }}
                key={index}   
                to={page.link}
                onClick={handleCloseNavMenu}
              >
                {page.title}
              </NavLink>
            ))}
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
