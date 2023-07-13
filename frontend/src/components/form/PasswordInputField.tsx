import { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { IconButton, InputAdornment, TextFieldProps } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { AuthFormInputField } from '@/components';

interface IProps {
  register: UseFormRegisterReturn;
  validationError?: FieldError;
}

function PasswordInputField({ register, validationError, ...props }: IProps & TextFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <AuthFormInputField
      register={register}
      validationError={validationError}
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword}>
              {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordInputField;
