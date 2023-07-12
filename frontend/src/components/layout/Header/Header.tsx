import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { CgMenuRightAlt } from 'react-icons/cg';
import { MdArrowForwardIos } from 'react-icons/md';
import { useAuthenticatedUser } from '@/hooks';
import logo from '@/assets/logo.png';
import { LoggedInDrawer, LoggedInNavbar } from './LoggedInView';
import { LoggedOutDrawer, LoggedOutNavbar } from './LoggedOutView';
import theme from '@/styles/theme';
import { menuItems } from './consts';

function Header() {
  const { user, userLoading } = useAuthenticatedUser();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen((prevState) => !prevState);
  };

  const router = useRouter();

  return (
    <>
      <AppBar
        component="nav"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Container>
          <Toolbar disableGutters>
            <Stack direction="row" alignItems="center" spacing={2} flexGrow={1}>
              <Link component={NextLink} href="/" sx={{ display: 'flex', alignItems: 'center' }}>
                <Image src={logo} alt="Blog logo" width={36} />
                <Typography component="span" variant="h4" ml={1}>
                  Daily Blog
                </Typography>
              </Link>
              {menuItems.map(({ id, href, name }) => (
                <Link
                  key={id}
                  component={NextLink}
                  href={href}
                  typography="h5"
                  display={{ xs: 'none', sm: 'block' }}>
                  {name}
                </Link>
              ))}
            </Stack>

            {!userLoading && !user && <LoggedOutNavbar />}
            {user && <LoggedInNavbar user={user} />}

            <IconButton
              color="inherit"
              aria-label="open menu"
              sx={{ display: { sm: 'none' } }}
              onClick={handleMobileDrawerToggle}>
              <CgMenuRightAlt fontSize={30} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          open={mobileDrawerOpen}
          onClose={handleMobileDrawerToggle}
          anchor="right"
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '300px',
            },
          }}>
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" p={2}>
              <Typography variant="h6">Daily Blog</Typography>
              <IconButton
                color="inherit"
                aria-label="open menu"
                sx={{ display: { sm: 'none' } }}
                onClick={handleMobileDrawerToggle}>
                <MdArrowForwardIos />
              </IconButton>
            </Stack>

            <Divider variant="middle" />

            <List>
              {menuItems.map(({ id, name, href, icon }) => (
                <ListItemButton
                  key={id + '-drawer'}
                  component={NextLink}
                  href={href}
                  onClick={handleMobileDrawerToggle}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              ))}
            </List>

            {!userLoading && !user && (
              <LoggedOutDrawer handleDrawerToggle={handleMobileDrawerToggle} />
            )}
            {user && <LoggedInDrawer user={user} handleDrawerToggle={handleMobileDrawerToggle} />}
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

export default Header;
