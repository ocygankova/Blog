import { Box, Stack } from '@mui/material';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { AuthFormInputField, LoadingButton } from '@/components';

interface IProps {
  register: UseFormRegisterReturn;
  validationError?: FieldError;
  label?: string;
  codeSending: boolean;
  timeoutLeft: number;
  onCodeRequest: () => void;
}

function VerificationCodeField({
  register,
  label,
  validationError,
  onCodeRequest,
  codeSending,
  timeoutLeft,
}: IProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
      <Box flex={1}>
        <AuthFormInputField
          register={register}
          validationError={validationError}
          label={label || 'Verification Code'}
          type="number"
        />
      </Box>

      <LoadingButton
        onClick={onCodeRequest}
        disabled={codeSending || timeoutLeft > 0}
        isLoading={codeSending}
        sx={{
          py: 1.6,
          alignSelf: { xs: 'flex-end', sm: 'flex-start' },
        }}>
        {timeoutLeft > 0 ? `Resend in ${timeoutLeft}` : 'Send Code'}
      </LoadingButton>
    </Stack>
  );
}

export default VerificationCodeField;
