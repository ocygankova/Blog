import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export const GoogleSignInButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="outlined"
      color="secondary"
      sx={{ py: 1 }}
      fullWidth
      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login/google?returnTo=${router.asPath}`}>
      <FcGoogle style={{ marginRight: 6 }} fontSize={24} />
      Sign in with Google
    </Button>
  );
};

export const GitHubSignInButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="outlined"
      color="secondary"
      sx={{ py: 1 }}
      fullWidth
      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login/github?returnTo=${router.asPath}`}>
      <FaGithub style={{ marginRight: 6 }} fontSize={22} />
      Sign in with GitHub
    </Button>
  );
};
