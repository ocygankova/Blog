import { useContext } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import * as CommentsApi from '@/http/api/comments';
import { IComment } from '@/models/comment';
import { useAuthenticatedUser } from '@/hooks';
import { AuthModalsContext } from '@/components/auth/AuthModalsProvider';
import { FormInputField, LoadingButton } from '@/components';
import { maxLengths } from '@/utils';

interface IProps {
  blogPostId: string;
  parentCommentId?: string;
  title?: string;
  placeholder?: string;
  onCommentCreated: (comment: IComment) => void;
  onCancel?: () => void;
}

const validationSchema = yup.object({
  text: yup.string(),
});

type ICreateCommentInput = yup.InferType<typeof validationSchema>;

function CreateCommentBox({
  blogPostId,
  title,
  parentCommentId,
  onCommentCreated,
  onCancel,
  placeholder = 'Add a comment...',
}: IProps) {
  const { user } = useAuthenticatedUser();
  const authModalsContext = useContext(AuthModalsContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ICreateCommentInput>({ resolver: yupResolver(validationSchema) });

  const onSubmit = async ({ text }: ICreateCommentInput) => {
    if (!text) return;

    try {
      const newComment = await CommentsApi.createComment(blogPostId, parentCommentId, text);
      onCommentCreated(newComment);
      reset();
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const handleDiscardButtonClick = () => {
    onCancel ? onCancel() : reset();
  };

  if (!user) {
    return (
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          authModalsContext.showLoginModal();
        }}
        sx={{ my: 2 }}>
        Log in to write a comment
      </Button>
    );
  }

  return (
    <div>
      <Box component="form" noValidate autoComplete="off" py={2} onSubmit={handleSubmit(onSubmit)}>
        <FormInputField
          register={register('text')}
          label={title}
          placeholder={placeholder}
          multiline
          maxLength={maxLengths.postComment}
          autoFocus={!!parentCommentId}
        />

        {(isDirty || parentCommentId) && (
          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={1}>
            <Button color="secondary" onClick={handleDiscardButtonClick}>
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              isLoading={isSubmitting}
              disabled={!isDirty}>
              Comment
            </LoadingButton>
          </Stack>
        )}
      </Box>
    </div>
  );
}

export default CreateCommentBox;
