import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { IconButton, InputAdornment, TextFieldProps } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FormInputField } from "@/components";

interface IProps {
  register: UseFormRegisterReturn;
  inputLabel?: string;
  inputError?: FieldError;
}

function PasswordInputField({
  register,
  inputLabel,
  inputError,
  ...props
}: IProps & TextFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <FormInputField
      register={register}
      inputLabel={inputLabel}
      inputError={inputError}
      {...props}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordInputField;
