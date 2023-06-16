import { FormControl, styled } from '@mui/material';

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  fontFamily: 'inherit',

  '& .rc-md-editor': {
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    borderColor: theme.palette.grey['400'],

    '&:hover': {
      borderColor: theme.palette.text.primary,
    },

    '&:focus-within': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
      margin: '-1px',

      '&.is-invalid': {
        borderColor: theme.palette.error.main,
      },
    },

    '&.is-invalid': {
      borderColor: theme.palette.error.main,
    },

    '&.full': {
      zIndex: theme.zIndex.appBar + 1,
    },

    '& .rc-md-navigation': {
      backgroundColor: theme.palette.background.default,
    },

    '& .editor-container': {
      '& .sec-html': {
        borderRight: 0,
      },

      '& .section-container.input, & .section-container.html-wrap': {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      },
    },
  },
}));
