import { useContext } from 'react';
import { Button, Stack } from '@mui/material';
import { AuthModalsContext } from '@/components/auth/AuthModalsProvider';

function LoggedOutNavbar() {
  const authModalsContext = useContext(AuthModalsContext);

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2} mr={{ sm: 4, md: 0 }}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ display: { xs: 'none', sm: 'block' } }}
          onClick={() => {
            authModalsContext.showLoginModal();
          }}>
          Log in
        </Button>
        <Button
          variant="contained"
          sx={{ display: { xs: 'none', md: 'block' } }}
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
