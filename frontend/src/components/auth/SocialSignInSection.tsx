import { Stack } from '@mui/material';
import { GitHubSignInButton, GoogleSignInButton } from './SocialSignInButtons';

function SocialSignInSection() {
  return (
    <Stack spacing={1}>
      <GoogleSignInButton />
      <GitHubSignInButton />
    </Stack>
  );
}

export default SocialSignInSection;
