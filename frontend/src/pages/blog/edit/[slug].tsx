import { useState } from 'react';
import { GetServerSideProps } from 'next';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as BlogApi from '@/http/api/blog';
import { NotFoundError } from '@/http/http-errors';
import { generateSlug, maxLengths, requiredStringSchema, slugSchema } from '@/utils';
import { IBlogPost } from '@/models/blogPost';
import { useAuthenticatedUser, useUnsavedChangesWarning } from '@/hooks';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  FormInputField,
  BlogPostSlugInputField,
  ConfirmationModal,
  LoadingButton,
  MarkdownEditor,
} from '@/components';

export const getServerSideProps: GetServerSideProps<IPageProps> = async ({ params }) => {
  try {
    const slug = params?.slug?.toString();
    if (!slug) throw Error('Slug missing');
    const post = await BlogApi.getBlogPostBySlug(slug);
    return { props: { post } };
  } catch (err) {
    if (err instanceof NotFoundError) {
      return { notFound: true };
    } else {
      throw err;
    }
  }
};

const validationSchema = yup.object({
  slug: slugSchema.required('Please fill out this field.'),
  title: requiredStringSchema,
  summary: requiredStringSchema,
  body: requiredStringSchema,
  postImage: yup.mixed<FileList>(),
});

type IUpdatePostFormData = yup.InferType<typeof validationSchema>;

interface IPageProps {
  post: IBlogPost;
}

export default function EditPost({ post }: IPageProps) {
  const router = useRouter();
  const { user, userLoading } = useAuthenticatedUser();

  const [showDiscardConfirmationModal, setShowDiscardConfirmationModal] = useState<boolean>(false);
  const [discardConfirmed, setDiscardConfirmed] = useState<boolean>(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);
  const [deletePending, setDeletePending] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    trigger,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<IUpdatePostFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: { slug: post.slug, title: post.title, summary: post.summary, body: post.body },
  });

  const onSubmit = async ({ title, slug, summary, body, postImage }: IUpdatePostFormData) => {
    try {
      await BlogApi.updateBlogPost(post._id, {
        title,
        slug,
        summary,
        body,
        postImage: postImage?.[0] || undefined,
      });
      await router.push(`/blog/${slug}`);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const openDeleteConfirmationModal = () => {
    setShowDeleteConfirmationModal(true);
  };

  const onDeleteConfirmed = async () => {
    setShowDeleteConfirmationModal(false);
    setDeletePending(true);

    try {
      await BlogApi.deleteBlogPost(post._id);
      router.push('/blog/');
    } catch (err) {
      setDeletePending(false);
      console.log(err);
      alert(err);
    }
  };

  const onDeleteDismissed = () => {
    setShowDeleteConfirmationModal(false);
  };

  const handleDiscardButtonClick = () => {
    if (!isDirty) router.push(`/blog/${post.slug}`);
    else setShowDiscardConfirmationModal(true);
  };

  const onDiscardConfirmed = () => {
    setShowDiscardConfirmationModal(false);
    setDiscardConfirmed(true);
    router.push(`/blog/${post.slug}`);
  };

  const onDiscardDismissed = () => {
    setShowDiscardConfirmationModal(false);
  };

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

  useUnsavedChangesWarning(isDirty && !isSubmitting && !deletePending && !discardConfirmed);

  const userIsAuthorized = (user && user._id === post.author._id) || false;

  if (userLoading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto' }} />;
  }

  if (!userIsAuthorized) {
    return <Typography>You are not authorized to edit this post.</Typography>;
  }

  return (
    <>
      <ConfirmationModal
        open={showDeleteConfirmationModal}
        onConfirm={onDeleteConfirmed}
        onDismiss={onDeleteDismissed}
        title="Confirm post deletion"
        message={
          <>
            <span>Do you want to permanently delete this post?</span>
            <br />
            <span>This action can not be reversed.</span>
          </>
        }
        confirmButtonColor="error"
        confirmButtonText="Delete post"
        dismissButtonText="Cancel"
      />

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
        Edit post
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
        />

        <BlogPostSlugInputField
          register={register('slug')}
          onGenerateSlugClick={generateSlugFromTitle}
          validationError={errors.slug}
          label="Post slug"
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
          rows={3}
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

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 4, sm: 2 }}>
          <Stack direction="row" justifyContent="flex-end" spacing={2} flex={1}>
            <LoadingButton
              type="submit"
              variant="contained"
              isLoading={isSubmitting}
              disabled={!isDirty}
              sx={{ px: { sm: 10 }, flex: { xs: 1, sm: 'unset' } }}>
              Save changes
            </LoadingButton>
            <Button variant="outlined" color="secondary" onClick={handleDiscardButtonClick}>
              Discard
            </Button>
          </Stack>
          <Button
            variant="outlined"
            color="error"
            disabled={deletePending}
            onClick={openDeleteConfirmationModal}
            sx={{ alignSelf: 'flex-end' }}>
            <DeleteOutlineIcon fontSize="small" sx={{ mr: 0.3 }} />
            Delete
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
