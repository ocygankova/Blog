import { ReactNode } from "react";
import { Box, Button, ButtonProps, CircularProgress } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

interface IProps {
  isLoading: boolean;
  children: ReactNode;
  disabled?: boolean;
}

function LoadingButton({
  isLoading,
  children,
  disabled,
  ...props
}: IProps & ButtonProps) {
  return (
    <Button {...props} disabled={disabled || isLoading}>
      {isLoading && (
        <>
          <CircularProgress
            size={16}
            sx={{ mr: 1 }}
            color="inherit"
            aria-hidden={true}
          />
          <Box component="span" sx={visuallyHidden}>
            Loading...
          </Box>
        </>
      )}
      {children}
    </Button>
  );
}

export default LoadingButton;
