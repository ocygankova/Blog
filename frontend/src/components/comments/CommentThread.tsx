import { useState } from 'react';
import { Box, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { BsChevronDown } from 'react-icons/bs';
import { IComment } from '@/models/comment';
import * as CommentsApi from '@/http/api/comments';
import { ButtonLink } from '@/components';
import Comment from './Comment';

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
  const [localReplies, setLocalReplies] = useState<IComment[]>([]);

  const loadNextRepliesPage = async () => {
    const continueAfterId = replies[replies.length - 1]?._id;
    try {
      setRepliesLoading(true);
      setRepliesLoadingIsError(false);

      const res = await CommentsApi.getRepliesForComment(comment._id, continueAfterId);
      setReplies([...replies, ...res.comments]);
      setRepliesPaginationEnd(res.endOfPaginationReached);
      setLocalReplies([]);
    } catch (err) {
      console.log(err);
      setRepliesLoadingIsError(true);
    } finally {
      setRepliesLoading(false);
    }
  };

  const handleReplyCreated = (reply: IComment) => {
    setLocalReplies([...localReplies, reply]);
  };
  const handleServerReplyUpdated = (updatedReply: IComment) => {
    const updatedReplyList = replies.map((reply) =>
      updatedReply._id === reply._id ? updatedReply : reply
    );
    setReplies(updatedReplyList);
  };

  const handleServerReplyDeleted = (deletedReply: IComment) => {
    const updatedReplyList = replies.filter((reply) => reply._id !== deletedReply._id);
    setReplies(updatedReplyList);
  };

  const handleLocalReplyUpdated = (updatedReply: IComment) => {
    const updatedReplyList = localReplies.map((reply) =>
      updatedReply._id === reply._id ? updatedReply : reply
    );
    setLocalReplies(updatedReplyList);
  };

  const handleLocalReplyDeleted = (deletedReply: IComment) => {
    const updatedReplyList = localReplies.filter((reply) => reply._id !== deletedReply._id);
    setLocalReplies(updatedReplyList);
  };

  const showRepliesButton = !!comment.repliesCount && !repliesPaginationEnd && !repliesLoading;

  // we don't get repliesPaginationEnd until 1st page of replies is rendered
  const showRepliesButtonText =
    repliesPaginationEnd === undefined
      ? `Show ${comment.repliesCount} ${comment.repliesCount === 1 ? 'reply' : 'replies'}`
      : 'Show more replies';

  return (
    <>
      <Comment
        comment={comment}
        onReplyCreated={handleReplyCreated}
        onCommentUpdated={onCommentUpdated}
        onCommentDeleted={onCommentDeleted}
      />
      <Replies
        replies={replies}
        onReplyCreated={handleReplyCreated}
        onReplyUpdated={handleServerReplyUpdated}
        onReplyDeleted={handleServerReplyDeleted}
      />

      <Stack pb={2} alignItems="center">
        {repliesLoading && <CircularProgress />}
        {repliesLoadingIsError && <Typography>Replies could not be loaded.</Typography>}
        {showRepliesButton && (
          <ButtonLink onClick={loadNextRepliesPage} sx={{ alignSelf: 'flex-start' }}>
            <BsChevronDown style={{ marginRight: '8px' }} />
            {showRepliesButtonText}
          </ButtonLink>
        )}
      </Stack>

      <Replies
        replies={localReplies}
        onReplyCreated={handleReplyCreated}
        onReplyUpdated={handleLocalReplyUpdated}
        onReplyDeleted={handleLocalReplyDeleted}
      />

      <Divider />
    </>
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
    <Box ml={{ xs: 4, sm: 6 }}>
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
