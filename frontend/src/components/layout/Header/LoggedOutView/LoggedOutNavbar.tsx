import { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { LogInModal, ResetPasswordModal, SignUpModal } from '@/components';

function LoggedOutNavbar() {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState<boolean>(false);

  return (
    <>
      <LogInModal
        open={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
        }}
        onSignUpInsteadClicked={() => {
          setShowLoginModal(false);
          setShowSignUpModal(true);
        }}
        onForgotPasswordClicked={() => {
          setShowLoginModal(false);
          setShowResetPasswordModal(true);
        }}
      />

      <SignUpModal
        open={showSignUpModal}
        onClose={() => {
          setShowSignUpModal(false);
        }}
        onLogInInsteadClicked={() => {
          setShowSignUpModal(false);
          setShowLoginModal(true);
        }}
      />

      <ResetPasswordModal
        open={showResetPasswordModal}
        onClose={() => {
          setShowResetPasswordModal(false);
        }}
        onSignUpClicked={() => {
          setShowResetPasswordModal(false);
          setShowSignUpModal(true);
        }}
      />

      <Stack direction="row" alignItems="center" spacing={2} display={{ xs: 'none', sm: 'block' }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setShowLoginModal(true);
          }}>
          Log in
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setShowSignUpModal(true);
          }}>
          Create account
        </Button>
      </Stack>
    </>
  );
}

export default LoggedOutNavbar;
