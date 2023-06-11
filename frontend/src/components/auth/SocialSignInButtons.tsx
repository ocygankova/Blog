import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

export const GoogleSignInButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="outlined"
      color="secondary"
      fullWidth
      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login/google?returnTo=${router.asPath}`}>
      <GoogleIcon fontSize="small" sx={{ mr: 1 }} />
      Continue with Google
    </Button>
  );
};

export const GitHubSignInButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="outlined"
      color="secondary"
      fullWidth
      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login/github?returnTo=${router.asPath}`}>
      <GitHubIcon fontSize="small" sx={{ mr: 1 }} />
      Continue with GitHub
    </Button>
  );
};
