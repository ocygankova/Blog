import { Components } from "@mui/material/styles/components";

export const MuiButton: Components["MuiButton"] = {
  defaultProps: {
    disableRipple: true,
  },

  styleOverrides: {
    root: {
      textTransform: "none",
      "&.Mui-focusVisible": {
        outline: "auto",
      },
    },
  },
};
