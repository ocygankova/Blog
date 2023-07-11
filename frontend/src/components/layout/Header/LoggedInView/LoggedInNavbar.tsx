import { MouseEvent, useState } from 'react';
import NextLink from 'next/link';
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
} from '@mui/material';
import { MdAdd, MdArrowDropDown, MdLogout, MdPerson } from 'react-icons/md';
import { IUser } from '@/models/user';
import { useAuthenticatedUser } from '@/hooks';
import * as UsersApi from '@/http/api/users';
import { UserAvatar } from '@/components';

interface IProps {
  user: IUser;
}

function LoggedInNavbar({ user: { username, displayName, profileImageUrl } }: IProps) {
  const { user, mutateUser } = useAuthenticatedUser();

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
    <Stack direction="row" alignItems="center" spacing={2} display={{ xs: 'none', sm: 'flex' }}>
      <Button component={NextLink} href="/blog/create" variant="outlined">
        <MdAdd fontSize={26} />
        <Typography component="span" ml={1}>
          Create post
        </Typography>
      </Button>

      <Tooltip title="Profile settings">
        <Stack
          component="button"
          direction="row"
          alignItems="center"
          aria-controls={open ? 'profile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
          <UserAvatar src={profileImageUrl} />
          <MdArrowDropDown fontSize={24} />
        </Stack>
      </Tooltip>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 0.8,
            minWidth: '200px',
          },
        }}
        onClose={handleClose}>
        {user?.username && (
          <MenuItem component={NextLink} href={`/users/${username}`} sx={{ mb: 2 }}>
            <ListItemIcon>
              <MdPerson fontSize={24} />
            </ListItemIcon>
            <ListItemText primary="Your profile" secondary={displayName || 'User'} />
          </MenuItem>
        )}

        <Divider />

        <MenuItem onClick={logoutUser} sx={{ mt: 2 }}>
          <ListItemIcon>
            <MdLogout fontSize={24} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </Stack>
  );
}

export default LoggedInNavbar;
