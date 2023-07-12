import { blueGrey, lightBlue, red } from '@mui/material/colors';
import { PaletteOptions } from '@mui/material/styles/createPalette';

export const palette: PaletteOptions = {
  primary: {
    main: lightBlue['800'],
  },
  secondary: {
    main: '#070b0d',
  },
  error: {
    main: red.A400,
  },
  background: {
    paper: '#fff',
    default: 'rgba(236,239,241,0.7)',
  },
  text: {
    primary: '#131b1d',
    secondary: '#6b6b7a',
    disabled: '#a2a2a2',
  },
  divider: blueGrey['100'],
};
