import { Box, BoxProps } from '@mui/material';

interface IProps {
  bgcolor?: string;
}

function Dot({ bgcolor = 'text.disabled', ...props }: IProps & BoxProps) {
  return (
    <Box
      component="span"
      height="3px"
      width="3px"
      sx={{ borderRadius: '50%', backgroundColor: bgcolor }}
      {...props}
    />
  );
}

export default Dot;
