import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress, Stack, Typography } from '@mui/material';
import * as BlogApi from '@/http/api/blog';
import { useAuthenticatedUser, useUnsavedChangesWarning } from '@/hooks';
import {
  maxLengths,
  generateSlug,
  requiredFileSchema,
  requiredStringSchema,
  slugSchema,
} from '@/utils';
import {
  BlogPostInputField,
  BlogPostSlugInputField,
  LoadingButton,
  MarkdownEditor,
} from '@/components';

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
      await BlogApi.createBlogPost({
        title,
        slug,
        summary,
        body,
        postImage: postImage[0],
      });
      await router.push(`/blog/${slug}`);
    } catch (err) {
      console.log(err);
      alert(err);
    }
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

  useUnsavedChangesWarning(isDirty && !isSubmitting);

  if (userLoading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto' }} />;
  }

  if (!userLoading && !user) {
    router.push('/');
  }

  return (
    <>
      <Typography component="h1" variant="h2" mb={4}>
        Create a post
      </Typography>

      <Stack
        spacing={4}
        component="form"
        noValidate
        // autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}>
        <BlogPostInputField
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

        <BlogPostInputField
          register={register('summary')}
          label="Post summary"
          placeholder="What is your post about?"
          validationError={errors.summary}
          multiline
          watch={watch}
          maxLength={maxLengths.postSummary}
        />

        <BlogPostInputField
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

        <LoadingButton
          type="submit"
          variant="contained"
          isLoading={isSubmitting}
          sx={{ alignSelf: { sm: 'center' }, px: 8 }}>
          Create post
        </LoadingButton>
      </Stack>
    </>
  );
}

export default CreatePostPage;
