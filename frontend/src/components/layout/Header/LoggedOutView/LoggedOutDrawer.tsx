import { useState } from 'react';
import { List, ListItem } from '@mui/material';
import { ButtonPill, LogInModal, SignUpModal } from '@/components';
import ResetPasswordModal from '@/components/modal/ResetPasswordModal';

interface IProps {
  handleDrawerToggle: () => void;
}

function LoggedOutDrawer({ handleDrawerToggle }: IProps) {
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

      <List onClick={handleDrawerToggle}>
        <ListItem>
          <ButtonPill
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => {
              setShowLoginModal(true);
            }}>
            Log in
          </ButtonPill>
        </ListItem>

        <ListItem>
          <ButtonPill
            variant="contained"
            fullWidth
            onClick={() => {
              setShowSignUpModal(true);
            }}>
            Create account
          </ButtonPill>
        </ListItem>
      </List>
    </>
  );
}

export default LoggedOutDrawer;
