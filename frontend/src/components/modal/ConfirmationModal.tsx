import { ReactNode } from 'react';
import { Button, ButtonProps, Stack, Typography } from '@mui/material';
import { DialogBase } from '@/components';

interface IProps {
  open: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
  title?: string;
  message?: string | ReactNode;
  confirmButtonText?: string;
  dismissButtonText?: string;
  confirmButtonVariant?: ButtonProps['variant'];
  confirmButtonColor?: ButtonProps['color'];
}

function ConfirmationModal({
  open,
  onConfirm,
  onDismiss,
  message,
  title = 'Confirm action',
  confirmButtonText = 'Confirm',
  dismissButtonText = 'Dismiss',
  confirmButtonVariant = 'contained',
  confirmButtonColor,
}: IProps) {
  return (
    <DialogBase open={open} onClose={onDismiss}>
      {title && (
        <Typography variant="h5" textAlign="center" mb={4}>
          {title}
        </Typography>
      )}

      <Typography mb={4} textAlign="center" lineHeight="200%">
        {message}
      </Typography>

      <Stack direction="row" spacing={3} justifyContent="center">
        <Button onClick={onDismiss} color="secondary" variant="outlined">
          {dismissButtonText}
        </Button>

        <Button onClick={onConfirm} color={confirmButtonColor} variant={confirmButtonVariant}>
          {confirmButtonText}
        </Button>
      </Stack>
    </DialogBase>
  );
}

export default ConfirmationModal;
