import NextLink from "next/link";
import Image from "next/image";
import { IBlogPost } from "@/models/blogPost";

interface IProps {
  post: IBlogPost;
}

function BlogPostCard({
  post: { slug, title, summary, imageUrl, author, createdAt },
}: IProps) {
  const postLink = `/blog/${slug}`;

  return (
    <div>
      <NextLink href={postLink}>
        <Image
          src={imageUrl}
          alt="Blog post thumbnail"
          width={550}
          height={200}
        />
      </NextLink>

      <p>{postLink}</p>
    </div>
  );
}

export default BlogPostCard;
