import NextLink from "next/link";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { IUser } from "@/models/user";
import { useAuthenticatedUser } from "@/hooks";
import * as UsersApi from "@/http/api/users";
import { UserAvatar } from "@/components";

interface IProps {
  user: IUser;
  handleDrawerToggle: () => void;
}

function LoggedInDrawer({
  handleDrawerToggle,
  user: { username, displayName, profileImageUrl },
}: IProps) {
  const { mutateUser } = useAuthenticatedUser();

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
    <List onClick={handleDrawerToggle}>
      <ListItem>
        <Button
          component={NextLink}
          href="/blog/create"
          variant="outlined"
          fullWidth
        >
          <AddIcon />
          <Typography component="span" ml={2}>
            Create post
          </Typography>
        </Button>
      </ListItem>

      <ListItem component={NextLink} href={`/users/${username}`}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText
          primary="Your profile"
          secondary={displayName || "User"}
        />
        <ListItemAvatar
          sx={{
            "& .MuiAvatar-root": {
              marginRight: 0,
              marginLeft: "auto",
            },
          }}
        >
          <UserAvatar src={profileImageUrl} />
        </ListItemAvatar>
      </ListItem>

      <Divider />
      <ListItem onClick={logoutUser} sx={{ mt: 2, cursor: "pointer" }}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
}

export default LoggedInDrawer;
