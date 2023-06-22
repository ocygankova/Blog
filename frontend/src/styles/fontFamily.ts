import { Roboto_Condensed, Montserrat } from 'next/font/google';

export const robotoCondensed = Roboto_Condensed({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'fallback',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const fontFamilyRobotoCondensed = robotoCondensed.style.fontFamily;
export const fontFamilyMontserrat = montserrat.style.fontFamily;
