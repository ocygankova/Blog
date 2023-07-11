import NextLink from 'next/link';
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { MdAdd, MdLogout, MdPerson } from 'react-icons/md';
import { IUser } from '@/models/user';
import { useAuthenticatedUser } from '@/hooks';
import * as UsersApi from '@/http/api/users';
import { UserAvatar } from '@/components';

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
        <Button component={NextLink} href="/blog/create" variant="outlined" fullWidth>
          <MdAdd fontSize={26} />
          <Typography component="span" ml={2}>
            Create post
          </Typography>
        </Button>
      </ListItem>

      <ListItem component={NextLink} href={`/users/${username}`}>
        <ListItemIcon>
          <MdPerson fontSize={24} />
        </ListItemIcon>
        <ListItemText primary="Your profile" secondary={displayName || 'User'} />
        <ListItemAvatar
          sx={{
            '& .MuiAvatar-root': {
              marginRight: 0,
              marginLeft: 'auto',
            },
          }}>
          <UserAvatar src={profileImageUrl} />
        </ListItemAvatar>
      </ListItem>

      <Divider />
      <ListItem onClick={logoutUser} sx={{ mt: 2, cursor: 'pointer' }}>
        <ListItemIcon>
          <MdLogout fontSize={24} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
}

export default LoggedInDrawer;
