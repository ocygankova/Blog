import { createTheme } from "@mui/material/styles";
import { responsiveFontSizes } from "@mui/material";
import { MuiCssBaseline, MuiLink } from "@/styles/components";
import { palette } from "@/styles/palette";
import { typography } from "@/styles/typography";

const basicTheme = createTheme({
  typography,
  palette,
  components: {
    MuiCssBaseline,
    MuiLink,
  },
});

const theme = responsiveFontSizes(basicTheme);

export default theme;
