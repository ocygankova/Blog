import { useState } from 'react';
import { IComment } from '@/models/comment';
import * as CommentsApi from '@/http/api/comments';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import Comment from '@/components/comments/Comment';

interface IProps {
  comment: IComment;
  onCommentUpdated: (updatedComment: IComment) => void;
  onCommentDeleted: (comment: IComment) => void;
}

function CommentThread({ comment, onCommentUpdated, onCommentDeleted }: IProps) {
  const [replies, setReplies] = useState<IComment[]>([]);
  const [repliesLoading, setRepliesLoading] = useState<boolean>(false);
  const [repliesLoadingIsError, setRepliesLoadingIsError] = useState<boolean>(false);
  const [repliesPaginationEnd, setRepliesPaginationEnd] = useState<boolean>();

  const loadNextRepliesPage = async () => {
    const continueAfterId = replies[replies.length - 1]?._id;
    try {
      setRepliesLoading(true);
      setRepliesLoadingIsError(false);

      const res = await CommentsApi.getRepliesForComment(comment._id, continueAfterId);
      setReplies([...replies, ...res.comments]);
      setRepliesPaginationEnd(res.endOfPaginationReached);
    } catch (err) {
      console.log(err);
      setRepliesLoadingIsError(true);
    } finally {
      setRepliesLoading(false);
    }
  };

  const handleReplyCreated = (reply: IComment) => {};
  const handleReplyUpdated = (updatedReply: IComment) => {};
  const handleReplyDeleted = (reply: IComment) => {};

  const showRepliesButton = !!comment.repliesCount && !repliesPaginationEnd && !repliesLoading;

  // we don't get repliesPaginationEnd until 1st page of replies is rendered
  const showRepliesButtonText =
    repliesPaginationEnd === undefined
      ? `Show ${comment.repliesCount} ${comment.repliesCount === 1 ? 'reply' : 'replies'}`
      : 'Show more replies';

  return (
    <div>
      <Comment
        comment={comment}
        onReplyCreated={handleReplyCreated}
        onCommentUpdated={onCommentUpdated}
        onCommentDeleted={onCommentDeleted}
      />
      <Replies
        replies={replies}
        onReplyCreated={handleReplyCreated}
        onReplyUpdated={handleReplyUpdated}
        onReplyDeleted={handleReplyDeleted}
      />

      <Stack pt={2} alignItems="center">
        {repliesLoading && <CircularProgress />}
        {repliesLoadingIsError && <Typography>Replies could not be loaded.</Typography>}
        {showRepliesButton && (
          <Button onClick={loadNextRepliesPage}>{showRepliesButtonText}</Button>
        )}
      </Stack>
    </div>
  );
}

export default CommentThread;

interface IRepliesProps {
  replies: IComment[];
  onReplyCreated: (reply: IComment) => void;
  onReplyUpdated: (updatedReply: IComment) => void;
  onReplyDeleted: (reply: IComment) => void;
}

function Replies({ replies, onReplyCreated, onReplyUpdated, onReplyDeleted }: IRepliesProps) {
  return (
    <Box ml={5}>
      {replies.map((item) => (
        <Comment
          key={item._id}
          comment={item}
          onReplyCreated={onReplyCreated}
          onCommentUpdated={onReplyUpdated}
          onCommentDeleted={onReplyDeleted}
        />
      ))}
    </Box>
  );
}
