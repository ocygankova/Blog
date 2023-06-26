import { useContext } from 'react';
import { Button, List, ListItem } from '@mui/material';
import { AuthModalsContext } from '@/components/auth/AuthModalsProvider';

interface IProps {
  handleDrawerToggle: () => void;
}

function LoggedOutDrawer({ handleDrawerToggle }: IProps) {
  const authModalsContext = useContext(AuthModalsContext);

  return (
    <>
      <List onClick={handleDrawerToggle}>
        <ListItem>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => {
              authModalsContext.showLoginModal();
            }}>
            Log in
          </Button>
        </ListItem>

        <ListItem>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              authModalsContext.showSignUpModal();
            }}>
            Create account
          </Button>
        </ListItem>
      </List>
    </>
  );
}

export default LoggedOutDrawer;
