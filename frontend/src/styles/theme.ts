import { createTheme } from "@mui/material/styles";
import { responsiveFontSizes } from "@mui/material";
import { MuiCssBaseline } from "@/styles/components";
import { palette } from "@/styles/palette";
import { fontFamily } from "@/styles/fontFamily";

const basicTheme = createTheme({
  typography: {
    fontFamily,
  },
  palette,
  components: {
    MuiCssBaseline,
  },
});

const theme = responsiveFontSizes(basicTheme);

export default theme;
