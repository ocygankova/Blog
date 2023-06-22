import { CSSProperties } from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    h2Uppercase: CSSProperties;
    h3Uppercase: CSSProperties;
  }

  interface TypographyVariantsOptions {
    h2Uppercase: CSSProperties;
    h3Uppercase: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h2Uppercase: true;
    h3Uppercase: true;
    subtitle1: false;
    subtitle2: false;
  }
}

export {};
