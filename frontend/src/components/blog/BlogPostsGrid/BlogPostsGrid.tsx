import { Grid } from "@mui/material";
import { IBlogPost } from "@/models/blogPost";
import { BlogPostCard } from "@/components";

interface IProps {
  posts: IBlogPost[];
}

function BlogPostsGrid({ posts }: IProps) {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {posts.map((post) => (
        <Grid item md={6} lg={4} key={post._id}>
          <BlogPostCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
}

export default BlogPostsGrid;
