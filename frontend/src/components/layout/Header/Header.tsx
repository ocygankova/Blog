import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import logo from "@/assets/logo.png";
import {
  AppBar,
  Container,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthenticatedUser } from "@/hooks";
import LoggedInNavbar from "./LoggedInNavbar/LoggedInNavbar";
import LoggedOutNavbar from "./LoggedOutNavbar/LoggedOutNavbar";
import MobileDrawer from "./MobileDrawer/MobileDrawer";

function Header() {
  const { user, userLoading, userLoadingError, mutateUser } =
    useAuthenticatedUser();

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
              edge="start"
              onClick={handleMobileDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <MobileDrawer
        open={mobileDrawerOpen}
        handleToggle={handleMobileDrawerToggle}
      />
    </>
  );
}

export default Header;
