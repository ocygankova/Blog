import NextLink from 'next/link';
import { Button, Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container sx={{ pt: 14 }}>
      <Typography mb={2}>
        This page is not implemented yet, please navigate the Blog Page to read latest articles.
      </Typography>

      <Button component={NextLink} href="/blog" variant="contained" size="large">
        Go to Blog →
      </Button>
    </Container>
  );
}
