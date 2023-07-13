import NextNProgress from 'nextjs-progressbar';
import { useTheme } from '@mui/material';

function ProgressBar() {
  const palette = useTheme().palette;

  return (
    <NextNProgress
      color={palette.primary.light}
      height={5}
      options={{
        showSpinner: false,
      }}
    />
  );
}

export default ProgressBar;
