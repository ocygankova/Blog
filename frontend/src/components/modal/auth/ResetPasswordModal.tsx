import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Typography } from '@mui/material';
import { emailSchema, passwordSchema, requiredStringSchema } from '@/utils/validation';
import { useAuthenticatedUser, useCountdown } from '@/hooks';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  TooManyRequestsError,
} from '@/http/http-errors';
import * as UsersApi from '@/http/api/users';
import {
  ButtonLink,
  DialogBase,
  AuthFormInputField,
  LoadingButton,
  PasswordInputField,
  VerificationCodeField,
} from '@/components';
import { verificationCodeRequestTimeoutSeconds } from '@/utils';

interface IProps {
  open: boolean;
  onClose: () => void;
  onSignUpClicked: () => void;
}

const validationSchema = yup.object({
  email: emailSchema.required('Please fill out this field.'),
  newPassword: passwordSchema.required('Please fill out this field.'),
  verificationCode: requiredStringSchema,
});

type IResetPasswordFormData = yup.InferType<typeof validationSchema>;

function ResetPasswordModal({ open, onClose, onSignUpClicked }: IProps) {
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
  } = useForm<IResetPasswordFormData>({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (credentials: IResetPasswordFormData) => {
    try {
      setErrorMessage(null);
      setShowVerificationCodeSentMessage(false);
      const user = await UsersApi.resetPassword(credentials);
      await mutateUser(user);
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
      await UsersApi.requestPasswordResetCode(email);
      setShowVerificationCodeSentMessage(true);
      startVerificationCodeTimeout(verificationCodeRequestTimeoutSeconds);
    } catch (error) {
      if (error instanceof NotFoundError) {
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
        Reset password
      </Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {showVerificationCodeSentMessage && (
        <Alert severity="warning">We sent you a verification code. Please check your inbox!</Alert>
      )}

      <Box
        pt={2}
        component="form"
        noValidate
        // autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}>
        <AuthFormInputField
          register={register('email')}
          label="Email"
          validationError={errors.email}
          sx={{
            mb: 2,
          }}
        />

        <PasswordInputField
          register={register('newPassword')}
          label="Password"
          validationError={errors.newPassword}
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
          Don&apos;t have an account yet?
          <ButtonLink onClick={withFormReset(onSignUpClicked)}>Sign up</ButtonLink>
        </Typography>
      </Box>
    </DialogBase>
  );
}

export default ResetPasswordModal;
