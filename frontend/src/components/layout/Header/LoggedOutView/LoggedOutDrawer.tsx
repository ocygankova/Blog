import { useState } from "react";
import { Button, List, ListItem } from "@mui/material";

interface IProps {
  handleDrawerToggle: () => void;
}

function LoggedOutDrawer({ handleDrawerToggle }: IProps) {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [showResetPasswordModal, setShowResetPasswordModal] =
    useState<boolean>(false);

  return (
    <List onClick={handleDrawerToggle}>
      <ListItem>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => {
            setShowLoginModal(true);
          }}
        >
          Log in
        </Button>
      </ListItem>

      <ListItem>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => {
            setShowSignUpModal(true);
          }}
        >
          Create account
        </Button>
      </ListItem>
    </List>
  );
}

export default LoggedOutDrawer;
