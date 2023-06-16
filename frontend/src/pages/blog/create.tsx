import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Typography } from '@mui/material';
import * as BlogApi from '@/http/api/blog';
import { requiredFileSchema, requiredStringSchema, slugSchema } from '@/utils/validation';
import { useAuthenticatedUser, useUnsavedChangesWarning } from '@/hooks';
import { generateSlug } from '@/utils/utils';
import { BlogPostInputField, BlogPostSlugInputField, LoadingButton } from '@/components';

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
  }, [title]);

  const generateSlugFromTitle = async () => {
    const validTitle = await trigger('title');
    if (!validTitle) return;
    const slug = generateSlug(getValues('title'));
    setValue('slug', slug, { shouldValidate: true });
  };

  useUnsavedChangesWarning(isDirty && !isSubmitting);

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
          label="Post title (100 characters maximum)"
          placeholder="What is your post title?"
          validationError={errors.title}
          id="title"
          inputProps={{ maxLength: 100 }}
          multiline
        />

        <BlogPostSlugInputField
          register={register('slug')}
          onGenerateSlugClick={generateSlugFromTitle}
          validationError={errors.slug}
          label="Post slug (100 characters maximum)"
          id="slug"
          multiline
          inputProps={{ maxLength: 100 }}
        />

        <BlogPostInputField
          register={register('summary')}
          label="Post summary (300 characters maximum)"
          placeholder="What is your post about?"
          validationError={errors.summary}
          id="summary"
          inputProps={{ maxLength: 300 }}
          multiline
        />

        <BlogPostInputField
          register={register('postImage')}
          label="Post cover image"
          validationError={errors.postImage}
          id="postImage"
          type="file"
          inputProps={{ accept: 'image/png,image/jpeg' }}
        />

        <LoadingButton type="submit" variant="contained" isLoading={isSubmitting}>
          Create post
        </LoadingButton>
      </Stack>
    </>
  );
}

export default CreatePostPage;
