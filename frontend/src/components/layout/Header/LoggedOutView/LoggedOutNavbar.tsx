import { useContext } from 'react';
import { Button, Stack } from '@mui/material';
import { AuthModalsContext } from '@/components/auth/AuthModalsProvider';

function LoggedOutNavbar() {
  const authModalsContext = useContext(AuthModalsContext);

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2} display={{ xs: 'none', sm: 'block' }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            authModalsContext.showLoginModal();
          }}>
          Log in
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            authModalsContext.showSignUpModal();
          }}>
          Create account
        </Button>
      </Stack>
    </>
  );
}

export default LoggedOutNavbar;
