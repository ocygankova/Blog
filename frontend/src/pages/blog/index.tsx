import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import * as BlogApi from "@/http/api/blog";
import { IBlogPostsPage } from "@/models/blogPost";
import { BlogPostsGrid } from "@/components";

export const getServerSideProps: GetServerSideProps<IPageProps> = async ({
  query,
}) => {
  const page = parseInt(query.page?.toString() || "1");

  if (page < 1) {
    query.page = "1";
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

  const handlePageItemClicked = (page: number) => {
    router.push({
      query: { ...router.query, page },
    });
  };

  return (
    <>
      <Head>
        <title>Articles - Blog</title>
        <meta name="description" content="Read the latest posts on Blog" />
      </Head>

      <div>
        <h1>Blog</h1>
        {blogPosts.length > 0 && <BlogPostsGrid posts={blogPosts} />}
      </div>
    </>
  );
}

export default Blog;
