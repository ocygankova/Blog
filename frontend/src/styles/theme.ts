import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { responsiveFontSizes } from "@mui/material";
import { MuiCssBaseline } from "@/styles/components";
import { palette } from "@/styles/palette";
import { fontFamily } from "@/styles/fontFamily";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

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
