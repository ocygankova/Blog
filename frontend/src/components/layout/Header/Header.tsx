import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useAuthenticatedUser } from "@/hooks";
import logo from "@/assets/logo.png";
import { LoggedInDrawer, LoggedInNavbar } from "./LoggedInView";
import { LoggedOutDrawer, LoggedOutNavbar } from "./LoggedOutView";

function Header() {
  const { user, userLoading } = useAuthenticatedUser();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen((prevState) => !prevState);
  };

  const router = useRouter();

  return (
    <>
      <AppBar component="nav" color="inherit">
        <Container>
          <Toolbar disableGutters>
            <Stack direction="row" alignItems="center" spacing={2} flexGrow={1}>
              <Link
                component={NextLink}
                href="/"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Image src={logo} alt="Blog logo" width={36} />
                <Typography component="span" variant="h4" ml={1}>
                  Welcome Blog
                </Typography>
              </Link>

              <Link
                component={NextLink}
                href="/"
                typography="h5"
                display={{ xs: "none", sm: "block" }}
              >
                Home
              </Link>
              <Link
                component={NextLink}
                href="/blog"
                typography="h5"
                display={{ xs: "none", sm: "block" }}
              >
                Articles
              </Link>
            </Stack>

            {!userLoading && !user && <LoggedOutNavbar />}
            {user && <LoggedInNavbar user={user} />}

            <IconButton
              color="inherit"
              aria-label="open menu"
              sx={{ display: { sm: "none" } }}
              onClick={handleMobileDrawerToggle}
            >
              <MenuIcon fontSize="large" />
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
            display: { sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "300px",
            },
          }}
        >
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              p={2}
            >
              <Typography variant="h6">Welcome Blog</Typography>
              <IconButton
                color="inherit"
                aria-label="open menu"
                sx={{ display: { sm: "none" } }}
                onClick={handleMobileDrawerToggle}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Stack>

            <Divider variant="middle" />

            <List onClick={handleMobileDrawerToggle}>
              <ListItem component={NextLink} href="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>

              <ListItem component={NextLink} href="/blog">
                <ListItemIcon>
                  <NewspaperIcon />
                </ListItemIcon>
                <ListItemText primary="Articles" />
              </ListItem>
            </List>

            {!userLoading && !user && (
              <LoggedOutDrawer handleDrawerToggle={handleMobileDrawerToggle} />
            )}
            {user && (
              <LoggedInDrawer
                user={user}
                handleDrawerToggle={handleMobileDrawerToggle}
              />
            )}
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

export default Header;
