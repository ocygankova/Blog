import { useState } from 'react';
import useSWR from 'swr';
import { CircularProgress, Container, Stack, Typography } from '@mui/material';
import { IUser } from '@/models/user';
import * as BlogApi from '@/http/api/blog';
import { BlogPostsGrid, PaginationBar } from '@/components';

interface IProps {
  user: IUser;
}

function UserPosts({ user }: IProps) {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, error } = useSWR([user._id, page, 'user_posts'], ([userId, page]) =>
    BlogApi.getBlogPostsByUser(userId, page)
  );

  const blogPosts = data?.blogPosts || [];
  const totalPages = data?.totalPages || 0;

  const handlePageItemClicked = (page: number) => {
    setPage(page);
  };

  return (
    <Container sx={{ py: 4, px: { xs: 0, sm: 3 } }} component="section">
      <Typography variant="h3Uppercase" mb={3} ml={{ xs: 2, sm: 0 }}>
        Published articles
      </Typography>

      {blogPosts.length > 0 && <BlogPostsGrid posts={blogPosts} />}

      <Stack mt={4} alignItems="center">
        {blogPosts.length > 0 && (
          <PaginationBar count={totalPages} page={page} onPageChange={handlePageItemClicked} />
        )}

        {isLoading && <CircularProgress />}

        {error && <Typography>Blog posts could not be loaded.</Typography>}

        {!isLoading && !error && blogPosts.length === 0 && (
          <Typography>No blog posts found.</Typography>
        )}
      </Stack>
    </Container>
  );
}

export default UserPosts;
