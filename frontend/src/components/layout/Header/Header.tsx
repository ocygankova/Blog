import { useState } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  LinkProps,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { MdArrowForwardIos, MdOutlineMenu } from 'react-icons/md';
import { useAuthenticatedUser } from '@/hooks';
import { LoggedInDrawer, LoggedInNavbar } from './LoggedInView';
import { LoggedOutDrawer, LoggedOutNavbar } from './LoggedOutView';
import theme from '@/styles/theme';
import logo from '@/assets/logo.svg';
import { menuItems } from './consts';

function Header() {
  const { user, userLoading } = useAuthenticatedUser();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen((prevState) => !prevState);
  };

  // const router = useRouter();

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
                <Image src={logo} alt="Blog logo" width={42} />
                <Typography component="span" color="text.primary" fontWeight={600} ml={1}>
                  DAILY BLOG
                </Typography>
              </Link>
              {menuItems.map(({ id, href, name }) => (
                <StyledNavLink
                  key={id}
                  component={NextLink}
                  href={href}
                  display={{ xs: 'none', md: 'block' }}
                  // highlighted={router.pathname === href}
                >
                  {name}
                </StyledNavLink>
              ))}
            </Stack>

            {!userLoading && !user && <LoggedOutNavbar />}
            {user && <LoggedInNavbar user={user} />}

            <IconButton
              color="inherit"
              aria-label="open menu"
              sx={{ display: { md: 'none' } }}
              onClick={handleMobileDrawerToggle}>
              <MdOutlineMenu fontSize={30} />
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
            display: { md: 'none' },
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
                aria-label="close menu"
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

interface StyledNavLinkProps extends LinkProps {
  highlighted?: boolean;
  component?: typeof NextLink;
}

const StyledNavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'highlighted',
})<StyledNavLinkProps>(({ highlighted, theme }) => ({
  color: 'inherit',
  lineHeight: '1.5rem',
  transition: 'ease 0.1s',
  position: 'relative',

  '&:hover': {
    color: theme.palette.primary.main,
  },
  // ...(highlighted &&
  //   {
  // color: theme.palette.primary.main,
  // fontWeight: 600,
  // '&:before': {
  //   content: '""',
  //   width: '100%',
  //   height: 1,
  //   backgroundColor: theme.palette.primary.main,
  //   position: 'absolute',
  //   left: 0,
  //   bottom: '-4px',
  // },
  // }),
}));
