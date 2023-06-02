import NextLink from "next/link";
import { Box, Container, Link, Stack, Typography } from "@mui/material";

function Footer() {
  return (
    <Box component="footer" py={3} bgcolor="grey.300">
      <Container>
        <Typography mb={2}>
          © {new Date().getFullYear()} Welcome Blog
        </Typography>

        <Stack direction="row" spacing={2}>
          <Link component={NextLink} href="/privacy">
            Privacy
          </Link>
          <Link component={NextLink} href="/privacy">
            Privacy
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
