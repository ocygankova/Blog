import { Box, Divider, Stack, Typography } from '@mui/material';
import { IComment } from '@/models/comment';
import { formatRelativeDate } from '@/utils';
import { Dot, UserProfileLink } from '@/components';

interface IProps {
  comment: IComment;
}

function Comment({ comment }: IProps) {
  return (
    <>
      <Divider />
      <CommentLayout comment={comment} />
    </>
  );
}

export default Comment;

function CommentLayout({ comment }: IProps) {
  return (
    <Box py={2}>
      <Typography mb={2}>{comment.text}</Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ sm: 'center' }}>
        <UserProfileLink user={comment.author} />
        <Dot display={{ xs: 'none', sm: 'block' }} />
        <Typography component="span" variant="overline">
          {formatRelativeDate(comment.createdAt)}
          {comment.updatedAt > comment.createdAt && 'Edited'}
        </Typography>
      </Stack>
    </Box>
  );
}
