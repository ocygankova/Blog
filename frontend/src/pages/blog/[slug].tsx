import { GetStaticPaths, GetStaticProps } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';
import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import EditIcon from '@mui/icons-material/Edit';
import * as BlogApi from '@/http/api/blog';
import { NotFoundError } from '@/http/http-errors';
import { IBlogPost } from '@/models/blogPost';
import { useAuthenticatedUser } from '@/hooks';
import { formatDate } from '@/utils/utils';
import {
  BlogCommentSection,
  Dot,
  Markdown,
  PageSectionWrapper,
  UserProfileLink,
} from '@/components';

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await BlogApi.getAllBlogPostSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<IPageProps> = async ({ params }) => {
  try {
    const slug = params?.slug?.toString();
    if (!slug) throw Error('Slug missing');
    const post = await BlogApi.getBlogPostBySlug(slug);
    return { props: { post } };
  } catch (err) {
    if (err instanceof NotFoundError) {
      return { notFound: true };
    } else {
      throw err;
    }
  }
};

interface IPageProps {
  post: IBlogPost;
}

function BlogPostPage({ post }: IPageProps) {
  const { user } = useAuthenticatedUser();
  const { data: revalidatedPost } = useSWR(post.slug, BlogApi.getBlogPostBySlug, {
    revalidateOnFocus: false,
  });
  const { summary, title, slug, body, coverImageUrl, author, createdAt, updatedAt, _id } =
    revalidatedPost || post;

  const createdUpdatedText =
    updatedAt > createdAt ? (
      <>
        updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
      </>
    ) : (
      <>
        <time dateTime={createdAt}>{formatDate(createdAt)}</time>
      </>
    );

  return (
    <>
      <Head>
        <title>{`${title} - Blog`}</title>
        <meta name="description" content={summary} />
      </Head>

      <Container>
        <Stack direction="row" spacing={{ xs: 2, sm: 5 }} alignItems="center" mb={4} pt={12}>
          <Button component={NextLink} href={`/blog`} sx={{ pl: 0 }}>
            <NavigateBeforeIcon sx={{ mr: 1 }} />
            <span>Back to Blog</span>
          </Button>

          {user?._id === author._id && (
            <Button
              component={NextLink}
              href={`/blog/edit/${slug}`}
              variant="outlined"
              color="inherit">
              <EditIcon fontSize="small" sx={{ mr: 1 }} />
              <span>Edit post</span>
            </Button>
          )}
        </Stack>
      </Container>

      <PageSectionWrapper coverImageSrc={coverImageUrl} coverImageAlt={title} component="article">
        <Typography variant="h1" mb={4}>
          {title}
        </Typography>

        <Typography variant="h4" mb={4}>
          {summary}
        </Typography>

        <Divider sx={{ mt: 6, mb: 3 }} />

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}>
          <UserProfileLink
            user={author}
            avatarSize="md"
            typography="body1"
            color="primary"
            mb={{ xs: 1, md: 0 }}
          />

          <Dot display={{ xs: 'none', md: 'block' }} mx={2} />

          <Typography component="span" variant="body2">
            {createdUpdatedText}
          </Typography>
        </Stack>

        <Divider sx={{ mt: 3, mb: 6 }} />

        <Markdown>{body}</Markdown>
      </PageSectionWrapper>

      <PageSectionWrapper>
        <BlogCommentSection blogPostId={_id} />
      </PageSectionWrapper>
    </>
  );
}

export default BlogPostPage;
