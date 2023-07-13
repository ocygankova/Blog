import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import { Container, Stack, Typography } from '@mui/material';
import * as BlogApi from '@/http/api/blog';
import { IBlogPostsPage } from '@/models/blogPost';
import { BlogPostsGrid, PaginationBar } from '@/components';

export const getServerSideProps: GetServerSideProps<IPageProps> = async ({ query }) => {
  const page = parseInt(query.page?.toString() || '1');

  if (page < 1) {
    query.page = '1';
    return {
      redirect: {
        destination: `/blog?${stringify(query)}`,
        permanent: false, // prevents caching by browser
      },
    };
  }

  const data = await BlogApi.getBlogPosts(page);

  if (data.totalPages > 0 && page > data.totalPages) {
    query.page = data.totalPages.toString();
    return {
      redirect: {
        destination: `/blog?${stringify(query)}`,
        permanent: false, // prevents caching by browser
      },
    };
  }

  return { props: { data } };
};

interface IPageProps {
  data: IBlogPostsPage;
}

//==================================================================

function Blog({ data: { blogPosts, page, totalPages } }: IPageProps) {
  const router = useRouter();

  const handlePageItemClicked = async (page: number) => {
    await router.push({
      query: { ...router.query, page },
    });
  };

  return (
    <>
      <Head>
        <title>Articles - Daily Blog</title>
        <meta name="description" content="Read the latest posts on Daily Blog" />
      </Head>

      <Container sx={{ pt: 12, px: { xs: 0, sm: 3 } }} component="section">
        <Typography component="h1" variant="h2Uppercase" mb={4} ml={{ xs: 2, sm: 0 }}>
          Latest posts
        </Typography>

        {blogPosts.length > 0 && <BlogPostsGrid posts={blogPosts} />}

        <Stack py={4}>
          {blogPosts.length > 0 && (
            <PaginationBar
              count={totalPages}
              page={page}
              onPageChange={handlePageItemClicked}
              sx={{ mx: 'auto' }}
            />
          )}

          {blogPosts.length === 0 && <Typography>No blog posts found.</Typography>}
        </Stack>
      </Container>
    </>
  );
}

export default Blog;
