import { MouseEvent, useState } from "react";
import NextLink from "next/link";
import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { IUser } from "@/models/user";
import { useAuthenticatedUser } from "@/hooks";
import * as UsersApi from "@/http/api/users";
import { UserAvatar } from "@/components";

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

      <Tooltip title="Profile settings">
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
          <UserAvatar src={profileImageUrl} />
          <ArrowDropDownIcon />
        </Stack>
      </Tooltip>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 0.8,
            minWidth: "200px",
          },
        }}
        onClose={handleClose}
      >
        <MenuItem
          component={NextLink}
          href={`/users/${username}`}
          sx={{ mb: 2 }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText
            primary="Your profile"
            secondary={displayName || "User"}
          />
        </MenuItem>

        <Divider />
        <MenuItem onClick={logoutUser} sx={{ mt: 2 }}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </Stack>
  );
}

export default LoggedInNavbar;
