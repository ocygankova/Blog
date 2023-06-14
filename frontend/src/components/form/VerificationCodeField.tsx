import { Box, Button, Stack } from '@mui/material';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { FormInputField } from '@/components';

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
    <Stack direction="row" spacing={1} alignItems="flex-start">
      <Box flex={1}>
        <FormInputField
          register={register}
          validationError={validationError}
          label={label || 'Verification Code'}
          type="number"
        />
      </Box>

      <Button
        onClick={onCodeRequest}
        disabled={codeSending || timeoutLeft > 0}
        sx={{
          py: 1.7,
        }}>
        {timeoutLeft > 0 ? `Resend in ${timeoutLeft}` : 'Send Code'}
      </Button>
    </Stack>
  );
}

export default VerificationCodeField;
