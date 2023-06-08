import * as yup from "yup";
import { requiredStringSchema } from "@/utils/validation";
import { useAuthenticatedUser } from "@/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { UnauthorizedError } from "@/http/http-errors";
import * as UsersApi from "@/http/api/users";
import { ButtonLink, ButtonPill } from "@/components";

interface IProps {
  open: boolean;
  onClose: () => void;
  onSignUpInsteadClicked: () => void;
  onForgotPasswordClicked: () => void;
}

const validationSchema = yup.object({
  username: requiredStringSchema,
  password: requiredStringSchema,
});

type ILogInFormData = yup.InferType<typeof validationSchema>;

function LogInModal({
  open,
  onClose,
  onSignUpInsteadClicked,
  onForgotPasswordClicked,
}: IProps) {
  const { mutateUser } = useAuthenticatedUser();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ILogInFormData>({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (credentials: ILogInFormData) => {
    try {
      setErrorMessage(null);
      const user = await UsersApi.logIn(credentials);
      await mutateUser(user);

      onClose();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorMessage("Invalid credentials");
      } else {
        console.log(error);
        alert(error);
      }
    }
  };

  const withFormReset = (func: () => void) => () => {
    func();
    reset();
    setErrorMessage(null);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <DialogTitle>Log in</DialogTitle>
      <DialogContent sx={{ minWidth: "300px" }}>
        <TextField
          autoFocus
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
        <ButtonLink onClick={onForgotPasswordClicked}>
          Forgot password?
        </ButtonLink>

        <ButtonPill variant="contained" fullWidth onClick={onClose}>
          Log in
        </ButtonPill>

        <Typography my={2}>
          Don&apos;t have an account yet?
          <ButtonLink onClick={onSignUpInsteadClicked}>Sign up</ButtonLink>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default LogInModal;
