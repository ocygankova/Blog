import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Stack, Typography } from '@mui/material';
import { maxLengths, usernameSchema } from '@/utils';
import { useAuthenticatedUser } from '@/hooks';
import { BadRequestError, ConflictError } from '@/http/http-errors';
import * as UsersApi from '@/http/api/users';
import { AuthFormInputField, LoadingButton } from '@/components';

const validationSchema = yup.object({
  username: usernameSchema.required('Username is required.'),
});

type IOnboardingInput = yup.InferType<typeof validationSchema>;

function OnboardingPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();
  const { user, userLoading, mutateUser } = useAuthenticatedUser();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<IOnboardingInput>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ username }: IOnboardingInput) => {
    try {
      setErrorMessage(null);
      const updatedUser = await UsersApi.updateUser({
        username,
        displayName: username,
      });
      mutateUser(updatedUser);
    } catch (error) {
      if (error instanceof ConflictError || error instanceof BadRequestError) {
        setErrorMessage(error.message);
      } else {
        console.log(error);
        alert(error);
      }
    }
  };

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/');
    }
    if (user?.username) {
      const returnTo = router.query.returnTo?.toString();
      router.push(returnTo || '/');
    }
  }, [user, userLoading, router]);

  return (
    <>
      <Typography variant="h1" mb={4}>
        Onboarding
      </Typography>

      <Typography variant="h4" component="p" mb={4} lineHeight="200%">
        Thank you for signing up!
        <br />
        Before we continue, please set your username!
      </Typography>

      <Box maxWidth={800}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {errorMessage}
          </Alert>
        )}

        <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} spacing={2}>
          <AuthFormInputField
            register={register('username')}
            label="Username"
            validationError={errors.username}
            watch={watch}
            maxLength={maxLengths.userName}
          />

          <LoadingButton
            type="submit"
            isLoading={isSubmitting}
            variant="contained"
            sx={{ alignSelf: { sm: 'flex-end' }, px: 10 }}>
            Submit
          </LoadingButton>
        </Stack>
      </Box>
    </>
  );
}

export default OnboardingPage;
