import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface IProps {
  register: UseFormRegisterReturn;
  validationError?: FieldError;
}

function BlogPostInputField({ register, validationError, ...props }: IProps & TextFieldProps) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      error={!!validationError}
      helperText={validationError?.message}
      {...register}
      {...props}
      InputLabelProps={{ shrink: true }}
      sx={{
        '& label': { transform: 'none', position: 'inherit', mb: 1.5, color: 'inherit' },
        '& legend': { display: 'none' },
        '& fieldset': { top: '0' },
      }}
    />
  );
}

export default BlogPostInputField;
