import NextLink from 'next/link';
import NextImage from 'next/image';
import { Box, Stack, Typography } from '@mui/material';
import { IBlogPost } from '@/models/blogPost';
import { formatDate } from '@/utils/utils';
import { Dot, MultilineText, PaperRounded, TitleLink, UserProfileLink } from '@/components';

interface IProps {
  post: IBlogPost;
}

function BlogPostCard({ post: { slug, title, summary, imageUrl, author, createdAt } }: IProps) {
  const postLink = `/blog/${slug}`;

  return (
    <PaperRounded
      variant="outlined"
      sx={{
        height: '100%',
        overflow: 'hidden',
      }}>
      <article>
        <PaperRounded elevation={0} sx={{ mb: 2 }}>
          <NextLink href={postLink}>
            <NextImage
              src={imageUrl}
              alt="Blog post thumbnail"
              width={550}
              height={280}
              style={{ objectFit: 'cover', width: '100%' }}
            />
          </NextLink>
        </PaperRounded>

        <Box p={2}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            <UserProfileLink user={author} />

            <Stack direction={'row'} spacing={1} alignItems="center" py={1}>
              <Dot />
              <Typography variant="caption">
                <time dateTime={createdAt}>{formatDate(createdAt)}</time>
              </Typography>{' '}
            </Stack>
          </Stack>

          <TitleLink href={postLink} text={title} />

          <MultilineText maxLines={2} variant="body2" mb={2}>
            {summary}
          </MultilineText>
        </Box>
      </article>
    </PaperRounded>
  );
}

export default BlogPostCard;
