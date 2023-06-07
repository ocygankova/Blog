import NextLink from "next/link";
import NextImage from "next/image";
import { Box, Paper, Typography } from "@mui/material";
import { IBlogPost } from "@/models/blogPost";
import { formatDate } from "@/utils/utils";
import { MultilineText, TitleLink, UserProfileLink } from "@/components";

interface IProps {
  post: IBlogPost;
}

function BlogPostCard({
  post: { slug, title, summary, imageUrl, author, createdAt },
}: IProps) {
  const postLink = `/blog/${slug}`;

  return (
    <Paper
      component="article"
      variant="outlined"
      elevation={0}
      sx={{
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Paper elevation={0} sx={{ overflow: "hidden", mb: 2 }}>
        <NextLink href={postLink}>
          <NextImage
            src={imageUrl}
            alt="Blog post thumbnail"
            width={550}
            height={280}
            style={{ objectFit: "cover", width: "100%" }}
          />
        </NextLink>
      </Paper>

      <Box p={2}>
        <UserProfileLink user={author} />

        <TitleLink href={postLink} text={title} />

        <MultilineText maxLines={2}>{summary}</MultilineText>

        <Typography mt={2}>
          <time dateTime={createdAt}>{formatDate(createdAt)}</time>
        </Typography>
      </Box>
    </Paper>
  );
}

export default BlogPostCard;
