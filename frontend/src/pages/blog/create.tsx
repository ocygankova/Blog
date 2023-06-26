import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, CircularProgress, Stack, Typography } from '@mui/material';
import * as BlogApi from '@/http/api/blog';
import { useAuthenticatedUser, useUnsavedChangesWarning } from '@/hooks';
import {
  generateSlug,
  maxLengths,
  requiredFileSchema,
  requiredStringSchema,
  slugSchema,
} from '@/utils';
import {
  BlogPostSlugInputField,
  ConfirmationModal,
  FormInputField,
  LoadingButton,
  MarkdownEditor,
} from '@/components';
import { ConflictError, TooManyRequestsError } from '@/http/http-errors';

const validationSchema = yup.object({
  title: requiredStringSchema,
  slug: slugSchema.required('Please fill out this field.'),
  summary: requiredStringSchema,
  body: requiredStringSchema,
  postImage: requiredFileSchema,
});

type ICreatePostFormData = yup.InferType<typeof validationSchema>;

function CreatePostPage() {
  const router = useRouter();
  const { user, userLoading } = useAuthenticatedUser();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showDiscardConfirmationModal, setShowDiscardConfirmationModal] = useState<boolean>(false);
  const [discardConfirmed, setDiscardConfirmed] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    getValues,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ICreatePostFormData>({ resolver: yupResolver(validationSchema) });

  const onSubmit = async ({ title, slug, summary, body, postImage }: ICreatePostFormData) => {
    try {
      setErrorMessage(null);
      await BlogApi.createBlogPost({
        title,
        slug,
        summary,
        body,
        postImage: postImage[0],
      });
      await router.push(`/blog/${slug}`);
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorMessage(error.message);
      } else if (error instanceof TooManyRequestsError) {
        setErrorMessage('Too many requests, please try again in 1 hour.');
      } else {
        console.log(error);
        alert(error);
      }
    }
  };

  const handleDiscardButtonClick = () => {
    if (!isDirty) router.push('/blog');
    else setShowDiscardConfirmationModal(true);
  };

  const onDiscardConfirmed = () => {
    setShowDiscardConfirmationModal(false);
    setDiscardConfirmed(true);
    router.push('/blog');
  };

  const onDiscardDismissed = () => {
    setShowDiscardConfirmationModal(false);
  };

  const title = watch('title');

  useEffect(() => {
    if (getValues('title')) {
      trigger('title');
    }
  }, [title, getValues, trigger]);

  const generateSlugFromTitle = async () => {
    const validTitle = await trigger('title');
    if (!validTitle) return;

    const maxLengthSlug = maxLengths.postSlug || undefined;
    let slug;

    if (maxLengthSlug && maxLengthSlug > 0) {
      slug = generateSlug(getValues('title')).slice(0, maxLengthSlug);
    } else {
      slug = generateSlug(getValues('title'));
    }

    setValue('slug', slug, { shouldValidate: true });
  };

  const handleTitleFieldBlur = () => {
    if (getValues('slug')) return;
    if (!getValues('title')) return;
    generateSlugFromTitle();
  };

  useUnsavedChangesWarning(isDirty && !isSubmitting && !discardConfirmed);

  if (userLoading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto' }} />;
  }

  if (!userLoading && !user) {
    router.push('/');
  }

  return (
    <>
      <ConfirmationModal
        open={showDiscardConfirmationModal}
        onConfirm={onDiscardConfirmed}
        onDismiss={onDiscardDismissed}
        title="Discard changes?"
        confirmButtonColor="error"
        confirmButtonText="Discard"
        dismissButtonText="Keep writing"
      />

      <Typography variant="h1" mb={4}>
        Create a post
      </Typography>

      <Stack spacing={4} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormInputField
          register={register('title')}
          label="Post title"
          placeholder="What is your post title?"
          validationError={errors.title}
          multiline
          watch={watch}
          maxLength={maxLengths.postTitle}
          onBlur={handleTitleFieldBlur}
        />

        <BlogPostSlugInputField
          register={register('slug')}
          onGenerateSlugClick={generateSlugFromTitle}
          validationError={errors.slug}
          label="Post slug "
          multiline
          watch={watch}
          maxLength={maxLengths.postSlug}
        />

        <FormInputField
          register={register('summary')}
          label="Post summary"
          placeholder="What is your post about?"
          validationError={errors.summary}
          multiline
          watch={watch}
          maxLength={maxLengths.postSummary}
        />

        <FormInputField
          register={register('postImage')}
          label="Post cover image"
          validationError={errors.postImage}
          type="file"
          inputProps={{ accept: 'image/png,image/jpeg' }}
        />

        <MarkdownEditor
          register={register('body')}
          watch={watch}
          setValue={setValue}
          validationError={errors.body}
          label="Post content"
        />

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <LoadingButton
            type="submit"
            variant="contained"
            isLoading={isSubmitting}
            disabled={!isDirty}
            sx={{ px: { sm: 10 }, flex: { xs: 1, sm: 'unset' } }}>
            Create post
          </LoadingButton>
          <Button variant="outlined" color="secondary" onClick={handleDiscardButtonClick}>
            Discard
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

export default CreatePostPage;
