import { MouseEvent, useState } from 'react';
import NextLink from 'next/link';
import {
  Button,
  Divider,
  Fade,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
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

  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const logoutUser = async () => {
    try {
      await UsersApi.logOut();
      await mutateUser(null);
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      closeMenu();
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2} mr={{ sm: 4, md: 0 }}>
      <Button
        component={NextLink}
        href="/blog/create"
        variant="outlined"
        sx={{ display: { xs: 'none', sm: 'flex' } }}>
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
          onClick={openMenu}
          sx={{ display: { xs: 'none', md: 'flex' } }}>
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
        TransitionComponent={Fade}
        onClose={closeMenu}>
        <MenuList>
          {user?.username && (
            <MenuItem
              component={NextLink}
              href={`/users/${username}`}
              sx={{ mb: 2 }}
              onClick={closeMenu}>
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
        </MenuList>
      </Menu>
    </Stack>
  );
}

export default LoggedInNavbar;
