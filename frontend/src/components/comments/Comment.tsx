import { useContext, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import * as CommentApi from '@/http/api/comments';
import { IComment } from '@/models/comment';
import { formatRelativeDate } from '@/utils';
import { useAuthenticatedUser } from '@/hooks';
import { NotFoundError } from '@/http/http-errors';
import { ButtonLink, ConfirmationModal, Dot, UserProfileLink } from '@/components';
import { AuthModalsContext } from '@/components/auth/AuthModalsProvider';
import EditCommentBox from './EditCommentBox';
import CreateCommentBox from './CreateCommentBox';

interface IProps {
  comment: IComment;
  onReplyCreated: (reply: IComment) => void;
  onCommentUpdated: (updatedComment: IComment) => void;
  onCommentDeleted: (comment: IComment) => void;
}

function Comment({ comment, onReplyCreated, onCommentUpdated, onCommentDeleted }: IProps) {
  const { user } = useAuthenticatedUser();
  const authModalsContext = useContext(AuthModalsContext);

  const [showEditBox, setShowEditBox] = useState<boolean>(false);
  const [showReplyBox, setShowReplyBox] = useState<boolean>(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);

  const handleReplyClicked = () => {
    if (user) {
      setShowReplyBox(true);
    } else {
      authModalsContext.showLoginModal();
    }
  };

  const handleEditClicked = () => {
    setShowEditBox(true);
    setShowReplyBox(false);
  };

  const handleDeleteClicked = () => {
    setShowDeleteConfirmationModal(true);
  };

  const handleDeleteDismissed = () => {
    setShowDeleteConfirmationModal(false);
  };

  const handleCommentUpdated = (updatedComment: IComment) => {
    onCommentUpdated(updatedComment);
    setShowEditBox(false);
  };

  const handleCommentUpdateDismissed = () => {
    setShowEditBox(false);
  };

  const handleReplyCreated = (reply: IComment) => {
    onReplyCreated(reply);
    setShowReplyBox(false);
  };

  const handleReplyDismissed = () => {
    setShowReplyBox(false);
  };

  const deleteComment = async () => {
    try {
      await CommentApi.deleteComment(comment._id);
      onCommentDeleted(comment);
    } catch (err) {
      console.log(err);
      if (err instanceof NotFoundError) {
        onCommentDeleted(comment);
      } else {
        alert(err);
      }
    } finally {
      setShowDeleteConfirmationModal(false);
    }
  };

  return (
    <>
      {showEditBox ? (
        <EditCommentBox
          comment={comment}
          onCommentUpdated={handleCommentUpdated}
          onCancel={handleCommentUpdateDismissed}
        />
      ) : (
        <CommentLayout
          comment={comment}
          onReplyClicked={handleReplyClicked}
          onEditClicked={handleEditClicked}
          onDeleteClicked={handleDeleteClicked}
        />
      )}

      {showReplyBox && (
        <CreateCommentBox
          blogPostId={comment.blogPostId}
          onCommentCreated={handleReplyCreated}
          parentCommentId={comment.parentCommentId ?? comment._id}
          onCancel={handleReplyDismissed}
          placeholder="Add a reply..."
          defaultText={comment.parentCommentId ? `@${comment.author.displayName}, ` : undefined}
        />
      )}

      <ConfirmationModal
        open={showDeleteConfirmationModal}
        onConfirm={deleteComment}
        onDismiss={handleDeleteDismissed}
        title={comment.parentCommentId ? 'Delete reply' : 'Delete comment'}
        message={
          comment.parentCommentId
            ? 'Delete your reply permanently?'
            : 'Delete your comment and all its replies permanently?'
        }
        confirmButtonColor="error"
        confirmButtonText="Delete"
        confirmButtonVariant="outlined"
        dismissButtonText="Cancel"
      />
    </>
  );
}

export default Comment;

interface ICommentLayoutProps {
  comment: IComment;
  onReplyClicked: () => void;
  onEditClicked: () => void;
  onDeleteClicked: () => void;
}

function CommentLayout({
  comment,
  onEditClicked,
  onReplyClicked,
  onDeleteClicked,
}: ICommentLayoutProps) {
  const { user } = useAuthenticatedUser();
  const userIsAuthor = (user && user._id === comment.author._id) || false;

  return (
    <Box py={2}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        alignItems={{ sm: 'center' }}
        mb={1}>
        <UserProfileLink user={comment.author} avatarSize={comment.parentCommentId ? 'sm' : 'md'} />
        <Dot display={{ xs: 'none', sm: 'block' }} />
        <Typography component="span" variant="overline">
          {formatRelativeDate(comment.createdAt)}
          {comment.updatedAt > comment.createdAt && ' (edited)'}
        </Typography>
      </Stack>

      <Typography mb={1}>{comment.text}</Typography>

      <Stack direction="row" spacing={2}>
        <ButtonLink onClick={onReplyClicked} sx={{ typography: 'caption', color: 'primary' }}>
          Reply
        </ButtonLink>

        {userIsAuthor && (
          <>
            <ButtonLink onClick={onEditClicked} color="secondary" sx={{ typography: 'caption' }}>
              Edit
            </ButtonLink>
            <ButtonLink onClick={onDeleteClicked} color="secondary" sx={{ typography: 'caption' }}>
              Delete
            </ButtonLink>
          </>
        )}
      </Stack>
    </Box>
  );
}
