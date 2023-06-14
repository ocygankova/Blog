import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

interface IProps {
  register: UseFormRegisterReturn;
  validationError?: FieldError;
}

function FormInputField({
  register,
  validationError,
  ...props
}: IProps & TextFieldProps) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      error={!!validationError}
      helperText={validationError?.message}
      {...register}
      {...props}
    />
  );
}

export default FormInputField;
