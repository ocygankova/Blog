import { FieldError, UseFormRegisterReturn, UseFormWatch } from 'react-hook-form';
import { Stack, TextField, TextFieldProps, Typography } from '@mui/material';

interface IProps {
  register: UseFormRegisterReturn;
  watch?: UseFormWatch<any>;
  validationError?: FieldError;
  maxLength?: number;
}

function FormInputField({
  register,
  watch,
  validationError,
  maxLength,
  ...props
}: IProps & TextFieldProps) {
  const getLength = (value?: string) => {
    if (maxLength && value && value.length > 0) return `${value.length}/${maxLength}`;
    else return null;
  };

  const renderHelperText = () => {
    return (
      <Stack component="span" direction="row" justifyContent="space-between">
        {validationError && <Typography component="span">{validationError?.message}</Typography>}
        {watch && <Typography component="span">{getLength(watch(register.name))}</Typography>}
      </Stack>
    );
  };

  const inputProps = {
    ...props.inputProps,
    maxLength: maxLength,
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      id={`${register.name}-input`}
      error={!!validationError}
      helperText={renderHelperText()}
      inputProps={inputProps}
      {...register}
      {...props}
    />
  );
}

export default FormInputField;
