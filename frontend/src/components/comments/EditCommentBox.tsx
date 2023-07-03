import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import * as CommentsApi from '@/http/api/comments';
import { IComment } from '@/models/comment';
import { FormInputField, LoadingButton } from '@/components';
import { maxLengths } from '@/utils';

interface IProps {
  comment: IComment;
  onCommentUpdated: (updatedComment: IComment) => void;
  onCancel: () => void;
}

const validationSchema = yup.object({
  newText: yup.string(),
});

type IUpdateCommentInput = yup.InferType<typeof validationSchema>;

function EditCommentBox({ comment, onCommentUpdated, onCancel }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<IUpdateCommentInput>({
    defaultValues: { newText: comment.text },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ newText }: IUpdateCommentInput) => {
    if (!newText) return;
    try {
      const updatedComment = await CommentsApi.updateComment(comment._id, newText);
      onCommentUpdated(updatedComment);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const handleDiscardButtonClick = () => {
    onCancel();
  };

  return (
    <div>
      <Box component="form" noValidate autoComplete="off" py={2} onSubmit={handleSubmit(onSubmit)}>
        <FormInputField
          register={register('newText')}
          label="Edit comment"
          multiline
          maxLength={maxLengths.postComment}
          autoFocus
        />

        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={1}>
          <Button color="secondary" onClick={handleDiscardButtonClick}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            isLoading={isSubmitting}
            disabled={!isDirty}>
            Save
          </LoadingButton>
        </Stack>
      </Box>
    </div>
  );
}

export default EditCommentBox;
