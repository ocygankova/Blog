import { useState } from 'react';
import { Stack } from '@mui/material';
import { ButtonPill, LogInModal, SignUpModal } from '@/components';
import ResetPasswordModal from '@/components/modal/ResetPasswordModal';

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
        <ButtonPill
          variant="outlined"
          color="secondary"
          onClick={() => {
            setShowLoginModal(true);
          }}>
          Log in
        </ButtonPill>
        <ButtonPill
          variant="contained"
          onClick={() => {
            setShowSignUpModal(true);
          }}>
          Create account
        </ButtonPill>
      </Stack>
    </>
  );
}

export default LoggedOutNavbar;
