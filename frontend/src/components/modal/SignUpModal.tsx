import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Divider, Typography } from '@mui/material';
import {
  emailSchema,
  passwordSchema,
  requiredStringSchema,
  usernameSchema,
} from '@/utils/validation';
import { useAuthenticatedUser, useCountdown } from '@/hooks';
import { BadRequestError, ConflictError } from '@/http/http-errors';
import * as UsersApi from '@/http/api/users';
import {
  ButtonLink,
  DialogBase,
  FormInputField,
  LoadingButton,
  PasswordInputField,
  SocialSignInSection,
  VerificationCodeField,
} from '@/components';

interface IProps {
  open: boolean;
  onClose: () => void;
  onLogInInsteadClicked: () => void;
}

const validationSchema = yup.object({
  username: usernameSchema.required('Please fill out this field.'),
  email: emailSchema.required('Please fill out this field.'),
  password: passwordSchema.required('Please fill out this field.'),
  verificationCode: requiredStringSchema,
});

type ISignUpFormData = yup.InferType<typeof validationSchema>;

function SignUpModal({ open, onClose, onLogInInsteadClicked }: IProps) {
  const { mutateUser } = useAuthenticatedUser();
  const { start: startVerificationCodeTimeout, secondsLeft: verificationCodeTimeoutSecondsLeft } =
    useCountdown();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verificationCodeRequestPending, setVerificationCodeRequestPending] =
    useState<boolean>(false);
  const [showVerificationCodeSentMessage, setShowVerificationCodeSentMessage] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ISignUpFormData>({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (credentials: ISignUpFormData) => {
    try {
      setErrorMessage(null);
      setShowVerificationCodeSentMessage(false);
      const newUser = await UsersApi.signUp(credentials);
      await mutateUser(newUser);
      onClose();
    } catch (error) {
      if (error instanceof ConflictError || error instanceof BadRequestError) {
        setErrorMessage(error.message);
      } else {
        console.log(error);
        alert(error);
      }
    }
  };

  const requestVerificationCode = async () => {
    const validEmail = await trigger('email');
    if (!validEmail) return;
    const email = getValues('email');

    setErrorMessage(null);
    setShowVerificationCodeSentMessage(false);
    setVerificationCodeRequestPending(true);

    try {
      await UsersApi.requestEmailVerificationCode(email);
      setShowVerificationCodeSentMessage(true);
      startVerificationCodeTimeout(60);
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorMessage(error.message);
      } else {
        console.log(error);
        alert(error);
      }
    } finally {
      setVerificationCodeRequestPending(false);
    }
  };

  return (
    <DialogBase open={open} onClose={onClose}>
      <Typography variant="h5" textAlign="center" mb={4}>
        Sign up to create an account
      </Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {showVerificationCodeSentMessage && (
        <Alert severity="warning">We sent you a verification code. Please check your inbox!</Alert>
      )}

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

        <FormInputField
          register={register('email')}
          label="Email"
          validationError={errors.email}
          id="email"
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
            mb: 2,
          }}
        />

        <VerificationCodeField
          register={register('verificationCode')}
          validationError={errors.verificationCode}
          codeSending={verificationCodeRequestPending}
          timeoutLeft={verificationCodeTimeoutSecondsLeft}
          onCodeRequest={requestVerificationCode}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth
          isLoading={isSubmitting}
          sx={{
            mt: 2,
          }}>
          Sign up
        </LoadingButton>

        <Typography mt={2} textAlign="center">
          Already have an account?
          <ButtonLink onClick={onLogInInsteadClicked}>Log in</ButtonLink>
        </Typography>
      </Box>
    </DialogBase>
  );
}

export default SignUpModal;
