import { Stack, StackProps } from '@mui/material';
import { GitHubSignInButton, GoogleSignInButton } from './SocialSignInButtons';

function SocialSignInSection({ ...props }: StackProps) {
  return (
    <Stack spacing={1} {...props}>
      <GoogleSignInButton />
      <GitHubSignInButton />
    </Stack>
  );
}

export default SocialSignInSection;
