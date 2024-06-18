import { Container } from '@mui/material';

function Marketplace() {
  return (
    <Container sx={{ pb: 4, pt: 12 }}>
      <h1>Discover amazing offers</h1>

      <iframe
        src="https://www.spendbase.co/discount-marketplace-widget/"
        title="Spendbase marketplace"
        width="100%"
        height="100%"
        frameborder="0"
        ></iframe>

      <p>
        At Daily Blog, accessible from www.blog-daily.com, one of our main priorities is the privacy
        of our visitors. This Privacy Policy document contains types of information that is
        collected and recorded by Daily Blog and how we use it.
      </p>
    </Container>
  );
}

export default Marketplace;
