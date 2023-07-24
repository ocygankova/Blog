import NextLink from 'next/link';
import { Box, Container, Link, Stack, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" pb={3} pt={5}>
      <Container>
        <Typography variant="body2" color="text.primary" mb={1}>
          © {new Date().getFullYear()} Daily Blog
        </Typography>

        <Stack direction="row" spacing={2}>
          <Link component={NextLink} href="/privacy" typography="body2" color="primary.main">
            Privacy Policy
          </Link>
          <Link component={NextLink} href="/blog" typography="body2" color="primary.main">
            Latest Posts
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
