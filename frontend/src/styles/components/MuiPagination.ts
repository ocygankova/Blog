import { Components } from "@mui/material/styles/components";

export const MuiPagination: Components["MuiPagination"] = {
  styleOverrides: {
    root: {
      "& .MuiPaginationItem-rounded": {
        borderRadius: "6px",
      },
    },
  },
};
