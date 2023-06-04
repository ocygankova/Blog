import { useState } from "react";
import { Button, Stack } from "@mui/material";

function LoggedOutNavbar() {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [showResetPasswordModal, setShowResetPasswordModal] =
    useState<boolean>(false);

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      display={{ xs: "none", sm: "block" }}
    >
      <Button
        onClick={() => {
          setShowLoginModal(true);
        }}
      >
        Log in
      </Button>
      <Button
        onClick={() => {
          setShowSignUpModal(true);
        }}
      >
        Create account
      </Button>
    </Stack>
  );
}

export default LoggedOutNavbar;
