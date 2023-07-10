import { Container } from '@mui/material';

function Page404() {
  return (
    <Container sx={{ pb: 4, pt: 12 }}>
      <h1>Not found</h1>
      <p>Looks like this page does not exist.</p>
    </Container>
  );
}

export default Page404;
