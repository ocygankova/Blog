import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

interface IProps {
  register: UseFormRegisterReturn;
  inputLabel?: string;
  inputError?: FieldError;
}

function FormInputField({
  register,
  inputLabel,
  inputError,
  ...props
}: IProps & TextFieldProps) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      error={!!inputError}
      helperText={inputError?.message}
      {...register}
      {...props}
    />
  );
}

export default FormInputField;
