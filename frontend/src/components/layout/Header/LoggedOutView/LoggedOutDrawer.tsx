import { useState } from 'react';
import { Button, List, ListItem } from '@mui/material';
import { LogInModal, ResetPasswordModal, SignUpModal } from '@/components';

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
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => {
              setShowLoginModal(true);
            }}>
            Log in
          </Button>
        </ListItem>

        <ListItem>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setShowSignUpModal(true);
            }}>
            Create account
          </Button>
        </ListItem>
      </List>
    </>
  );
}

export default LoggedOutDrawer;
