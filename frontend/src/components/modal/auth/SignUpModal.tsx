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
import { BadRequestError, ConflictError, TooManyRequestsError } from '@/http/http-errors';
import * as UsersApi from '@/http/api/users';
import {
  ButtonLink,
  DialogBase,
  AuthFormInputField,
  LoadingButton,
  PasswordInputField,
  SocialSignInSection,
  VerificationCodeField,
} from '@/components';
import { maxLengths, verificationCodeRequestTimeoutSeconds } from '@/utils';

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
    watch,
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
      startVerificationCodeTimeout(verificationCodeRequestTimeoutSeconds);
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorMessage(error.message);
      } else if (error instanceof TooManyRequestsError) {
        alert('Too many requests, please wait up to 1 minute.');
      } else {
        console.log(error);
        alert(error);
      }
    } finally {
      setVerificationCodeRequestPending(false);
    }
  };

  const withFormReset = (callback: () => void) => () => {
    callback();
    reset();
    setErrorMessage(null);
  };

  return (
    <DialogBase open={open} onClose={withFormReset(onClose)}>
      <Typography variant="h5" textAlign="center" mb={2}>
        Sign up to create an account
      </Typography>

      <SocialSignInSection pt={2} />

      <Divider sx={{ mt: 4, mb: 3 }}>Continue with your email</Divider>

      <Box
        component="form"
        noValidate
        // autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}>
        <AuthFormInputField
          register={register('username')}
          label="Username"
          validationError={errors.username}
          watch={watch}
          maxLength={maxLengths.userName}
          sx={{
            mb: 2,
          }}
        />

        <AuthFormInputField
          register={register('email')}
          label="Email"
          validationError={errors.email}
          sx={{
            mb: 2,
          }}
        />

        <PasswordInputField
          register={register('password')}
          label="Password"
          validationError={errors.password}
          sx={{
            mb: 2,
          }}
        />

        <Typography variant="body2" mb={0.4}>
          We will send verification code to the email you provided.
        </Typography>

        <VerificationCodeField
          register={register('verificationCode')}
          validationError={errors.verificationCode}
          codeSending={verificationCodeRequestPending}
          timeoutLeft={verificationCodeTimeoutSecondsLeft}
          onCodeRequest={requestVerificationCode}
        />

        {errorMessage && (
          <Alert
            severity="error"
            sx={{
              mt: 1.5,
            }}>
            {errorMessage}
          </Alert>
        )}

        {showVerificationCodeSentMessage && (
          <Alert
            severity="warning"
            sx={{
              mt: 1.5,
            }}>
            <>
              We sent you a verification code. Please check your inbox! <br />( ...be sure to check
              your spam box as well )
            </>
          </Alert>
        )}

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
          <ButtonLink onClick={withFormReset(onLogInInsteadClicked)}>Log in</ButtonLink>
        </Typography>
      </Box>
    </DialogBase>
  );
}

export default SignUpModal;
