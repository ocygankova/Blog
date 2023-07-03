import { CSSProperties } from 'react';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { fontFamilyMontserrat, fontFamilyRobotoCondensed } from '@/styles/fontFamily';
import { ThemeOptions } from '@mui/material';

interface IExtendedTypographyOptions extends TypographyOptions {
  h2Uppercase: CSSProperties;
  h3Uppercase: CSSProperties;
}

const createTypography = (theme: ThemeOptions): IExtendedTypographyOptions => {
  return {
    fontFamily: [fontFamilyRobotoCondensed, fontFamilyMontserrat].join(', '),

    h1: {
      fontFamily: fontFamilyRobotoCondensed,
      fontWeight: 600,
      fontSize: '3.2rem',
      letterSpacing: '-0.01562em',
      wordWrap: 'break-word',
      wordBreak: 'break-word',
    },

    h2: {
      fontFamily: fontFamilyRobotoCondensed,
      fontWeight: 700,
      fontSize: '2.75rem',
      letterSpacing: '-0.00833em',
    },

    h3: {
      fontFamily: fontFamilyRobotoCondensed,
      fontWeight: 700,
      fontSize: '1.85rem',
      letterSpacing: '0em',
    },

    h4: {
      fontFamily: fontFamilyMontserrat,
      fontWeight: 400,
      fontSize: '1.5rem',
      letterSpacing: '0.00735em',
      wordWrap: 'break-word',
      wordBreak: 'break-word',
    },

    h5: {
      fontFamily: fontFamilyMontserrat,
      fontWeight: 700,
      fontSize: '1.25rem',
      letterSpacing: '0em',
      wordWrap: 'break-word',
      wordBreak: 'break-word',
    },

    h6: {
      fontFamily: fontFamilyMontserrat,
      fontWeight: 700,
      fontSize: '1rem',
      letterSpacing: '0.008em',
      wordWrap: 'break-word',
      wordBreak: 'break-word',
    },

    body1: {
      fontFamily: fontFamilyMontserrat,
      fontWeight: 500,
      fontSize: '1rem',
      letterSpacing: '0.00500em',
      wordWrap: 'break-word',
      wordBreak: 'break-word',
    },

    body2: {
      fontFamily: fontFamilyMontserrat,
      fontWeight: 500,
      fontSize: '1rem',
      letterSpacing: '0.01070em',
      wordWrap: 'break-word',
      wordBreak: 'break-word',
      color: theme.palette?.text?.secondary,
    },

    h2Uppercase: {
      fontFamily: fontFamilyRobotoCondensed,
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.01833em',
      textTransform: 'uppercase',
      lineHeight: '110%',
    },

    h3Uppercase: {
      fontFamily: fontFamilyRobotoCondensed,
      fontWeight: 700,
      fontSize: '1.85rem',
      letterSpacing: '0em',
      textTransform: 'uppercase',
    },

    button: {
      fontFamily: fontFamilyMontserrat,
      fontWeight: 600,
      fontSize: '1rem',
      letterSpacing: '0.02857em',
    },

    caption: {
      fontFamily: fontFamilyMontserrat,
      fontWeight: 600,
      fontSize: '0.75rem',
      letterSpacing: '0.03333em',
      color: theme.palette?.text?.secondary,
    },

    overline: {
      fontFamily: fontFamilyMontserrat,
      fontWeight: 400,
      fontSize: '0.75rem',
      letterSpacing: '0',
      textTransform: 'none',
      lineHeight: 'inherit',
      color: theme.palette?.text?.secondary,
    },
  };
};

export default createTypography;
