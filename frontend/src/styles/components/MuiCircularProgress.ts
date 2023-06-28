import { Components } from '@mui/material/styles/components';

export const MuiCircularProgress: Components['MuiCircularProgress'] = {
  defaultProps: {
    disableShrink: true,
  },
  styleOverrides: {
    root: {
      animationDuration: '550ms',
    },
    circle: {
      strokeLinecap: 'round',
    },
  },
};
