import { MouseEvent, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import NextLink from "next/link";
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { IUser } from "@/models/user";
import { useAuthenticatedUser } from "@/hooks";
import * as UsersApi from "@/http/api/users";
import profileImgPlaceholder from "@/assets/profile-pic-placeholder.png";

interface IProps {
  user: IUser;
}

function LoggedInNavbar({
  user: { username, displayName, profileImageUrl },
}: IProps) {
  const { mutateUser } = useAuthenticatedUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = async () => {
    try {
      await UsersApi.logOut();
      await mutateUser(null);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      display={{ xs: "none", sm: "flex" }}
    >
      <Button component={NextLink} href="/blog/create" variant="outlined">
        <AddIcon />
        <Typography component="span" ml={1}>
          Create post
        </Typography>
      </Button>

      <Stack
        component="button"
        direction="row"
        alignItems="center"
        spacing={0.5}
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar>
          <Image
            src={profileImageUrl || profileImgPlaceholder}
            alt="User profile picture"
            width={40}
            height={40}
            priority
          />
        </Avatar>
        <ArrowDropDownIcon />
      </Stack>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem sx={{ mb: 2 }}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <NextLink href={`/users/${username}`}>Profile</NextLink>
        </MenuItem>

        <Divider />
        <MenuItem onClick={logoutUser} sx={{ mt: 2 }}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <span>Logout</span>
        </MenuItem>
      </Menu>
    </Stack>
  );
}

export default LoggedInNavbar;
