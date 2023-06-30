import { useCallback, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { IComment } from '@/models/comment';
import * as CommentsApi from '@/http/api/comments';
import CreateCommentBox from './CreateCommentBox';
import Comment from './Comment';

interface IProps {
  blogPostId: string;
}

function BlogCommentList({ blogPostId }: IProps) {
  return <CommentSection blogPostId={blogPostId} key={blogPostId} />;
}

export default BlogCommentList;

function CommentSection({ blogPostId }: IProps) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
  const [commentsLoadingIsError, setCommentsLoadingIsError] = useState<boolean>(false);
  const [commentsPaginationEnd, setCommentsPaginationEnd] = useState<boolean>();

  const loadNextCommentsPage = useCallback(
    async function (continueAfterId?: string) {
      {
        try {
          setCommentsLoading(true);
          setCommentsLoadingIsError(false);

          const res = await CommentsApi.getCommentsForBlogPost(blogPostId, continueAfterId);
          if (!continueAfterId) {
            setComments(res.comments);
          } else {
            setComments((prevState) => [...prevState, ...res.comments]);
          }
          setCommentsPaginationEnd(res.endOfPaginationReached);
        } catch (err) {
          console.log(err);
          setCommentsLoadingIsError(true);
        } finally {
          setCommentsLoading(false);
        }
      }
    },
    [blogPostId]
  );

  useEffect(() => {
    loadNextCommentsPage();
  }, [loadNextCommentsPage]);

  const handleCommentCreated = (newComment: IComment) => {
    setComments([newComment, ...comments]);
  };

  const handleShowMoreButtonClicked = () => {
    const lastCommentId = comments[comments.length - 1]?._id;
    loadNextCommentsPage(lastCommentId);
  };

  return (
    <Box pt={3}>
      <Typography variant="h3">Comments</Typography>
      <CreateCommentBox blogPostId={blogPostId} onCommentCreated={handleCommentCreated} />

      {comments.map((item) => (
        <Comment comment={item} key={item._id} />
      ))}

      <Stack pt={2} alignItems="center">
        {commentsLoading && <CircularProgress />}
        {commentsLoadingIsError && <Typography>Comments could not be loaded.</Typography>}
        {!commentsLoading && !commentsPaginationEnd && (
          <Button variant="outlined" onClick={handleShowMoreButtonClicked}>
            Show more comments
          </Button>
        )}
      </Stack>
    </Box>
  );
}
