import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Divider, Typography } from '@mui/material';
import { requiredStringSchema } from '@/utils/validation';
import { useAuthenticatedUser } from '@/hooks';
import { UnauthorizedError } from '@/http/http-errors';
import * as UsersApi from '@/http/api/users';
import {
  ButtonLink,
  DialogBase,
  FormInputField,
  LoadingButton,
  PasswordInputField,
  SocialSignInSection,
} from '@/components';

interface IProps {
  open: boolean;
  onClose: () => void;
  onSignUpInsteadClicked: () => void;
  onForgotPasswordClicked: () => void;
}

const validationSchema = yup.object({
  username: requiredStringSchema,
  password: requiredStringSchema,
});

type ILogInFormData = yup.InferType<typeof validationSchema>;

function LogInModal({ open, onClose, onSignUpInsteadClicked, onForgotPasswordClicked }: IProps) {
  const { mutateUser } = useAuthenticatedUser();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ILogInFormData>({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (credentials: ILogInFormData) => {
    try {
      setErrorMessage(null);
      const user = await UsersApi.logIn(credentials);
      await mutateUser(user);

      onClose();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorMessage('Invalid credentials');
      } else {
        console.log(error);
        alert(error);
      }
    }
  };

  const withFormReset = (callback: () => void) => () => {
    callback();
    reset();
    setErrorMessage(null);
  };

  return (
    <DialogBase open={open} onClose={onClose}>
      <Typography variant="h5" textAlign="center" mb={4}>
        Login to your account
      </Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <SocialSignInSection />

      <Divider sx={{ mt: 4, mb: 3 }}>Continue with your email address</Divider>

      <Box
        component="form"
        noValidate
        // autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}>
        <FormInputField
          register={register('username')}
          label="Username"
          validationError={errors.username}
          id="username"
          sx={{
            mb: 2,
          }}
        />

        <PasswordInputField
          register={register('password')}
          label="Password"
          validationError={errors.password}
          id="password"
          sx={{
            mb: 1,
          }}
        />

        <ButtonLink onClick={onForgotPasswordClicked} sx={{ display: 'block', ml: 'auto', mb: 2 }}>
          Forgot password?
        </ButtonLink>

        <LoadingButton type="submit" variant="contained" fullWidth isLoading={isSubmitting}>
          Log in
        </LoadingButton>

        <Typography mt={2} textAlign="center">
          Don&apos;t have an account yet?
          <ButtonLink onClick={onSignUpInsteadClicked}>Sign up</ButtonLink>
        </Typography>
      </Box>
    </DialogBase>
  );
}

export default LogInModal;
