import { Paper, PaperProps, styled } from '@mui/material';
import { ElementType } from 'react';

interface IProps {
  component?: ElementType;
  square_width?: 'sm' | 'md' | 'lg';
}

const ResponsiveRoundedPaper = styled(Paper)<PaperProps & IProps>(({ theme, square_width }) => ({
  borderRadius: 20,
  overflow: 'hidden',

  [theme.breakpoints.down(square_width || 'md')]: {
    borderRadius: 0,
  },
}));

export default ResponsiveRoundedPaper;
