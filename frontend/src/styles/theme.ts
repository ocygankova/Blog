import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { responsiveFontSizes } from "@mui/material";
import { red } from "@mui/material/colors";
import { globalStyles } from "@/styles/globalStyles";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const basicTheme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: globalStyles,
    },
  },
});

const theme = responsiveFontSizes(basicTheme);
export default theme;
