import { createTheme } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material';
import {
  MuiButton,
  MuiCircularProgress,
  MuiCssBaseline,
  MuiLink,
  MuiTooltip,
} from '@/styles/components';
import { palette } from '@/styles/palette';
import createTypography from '@/styles/typography';

let theme = createTheme({
  palette,
});

const typography = createTypography(theme);

theme = createTheme(theme, {
  typography,

  components: {
    MuiCssBaseline,
    MuiLink,
    MuiButton,
    MuiTooltip,
    MuiCircularProgress,

    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h2Uppercase: 'h2',
          h3Uppercase: 'h3',
        },
      },
    },
  },

  shape: {
    borderRadius: 8,
  },
});

theme = responsiveFontSizes(theme, { variants: ['h1', 'h2', 'h3', 'h4', 'h5'] });

export default theme;
