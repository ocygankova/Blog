import { GetStaticPaths, GetStaticProps } from 'next';
import NextImage from 'next/image';
import NextLink from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';
import { Button, Stack, Typography } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import EditIcon from '@mui/icons-material/Edit';
import * as BlogApi from '@/http/api/blog';
import { NotFoundError } from '@/http/http-errors';
import { IBlogPost } from '@/models/blogPost';
import { useAuthenticatedUser } from '@/hooks';
import { formatDate } from '@/utils/utils';
import { BlogPostImageBox } from '@/components';

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
  const { summary, title, slug, body, imageUrl, author, createdAt, updatedAt } =
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

      <Stack direction="row" spacing={5} alignItems="center" mb={4}>
        <Button component={NextLink} href={`/blog`}>
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

      <article>
        <Stack alignItems="center">
          <Typography component="h1" variant="h3" textAlign="center" mb={4}>
            {title}
          </Typography>

          <Typography variant="h5" textAlign="center" mb={1}>
            {summary}
          </Typography>

          <Typography>{createdUpdatedText} </Typography>

          <BlogPostImageBox my={2}>
            <NextImage
              src={imageUrl}
              alt={title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </BlogPostImageBox>

          <p>{body}</p>
        </Stack>
      </article>
    </>
  );
}

export default BlogPostPage;
