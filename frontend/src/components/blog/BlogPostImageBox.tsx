import { Box, styled } from '@mui/material';

const BlogPostImageBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '700px',
  aspectRatio: '70/45',
  overflow: 'hidden',
  // borderRadius: theme.shape.borderRadius,
  borderRadius: '18px',
}));

export default BlogPostImageBox;
