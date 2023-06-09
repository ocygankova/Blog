import { createTheme } from "@mui/material/styles";
import { responsiveFontSizes } from "@mui/material";
import {
  MuiCssBaseline,
  MuiLink,
  MuiTooltip,
  MuiMenu,
  MuiButton,
  MuiPagination,
  MuiDialog,
} from "@/styles/components";
import { palette } from "@/styles/palette";
import { typography } from "@/styles/typography";

const basicTheme = createTheme({
  typography,
  palette,
  components: {
    MuiCssBaseline,
    MuiLink,
    // MuiTooltip,
    // MuiMenu,
    MuiButton,
    MuiDialog,
    // MuiPagination,
  },
  shape: {
    borderRadius: 8,
  },
});

const theme = responsiveFontSizes(basicTheme);

export default theme;
