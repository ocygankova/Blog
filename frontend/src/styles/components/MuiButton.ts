import { Components } from "@mui/material/styles/components";

export const MuiButton: Components["MuiButton"] = {
  defaultProps: {
    disableRipple: true,
    disableElevation: true,
  },

  styleOverrides: {
    root: {
      textTransform: "none",
      fontSize: "inherit",
      "&.Mui-focusVisible": {
        outline: "auto",
      },
    },
  },
};
