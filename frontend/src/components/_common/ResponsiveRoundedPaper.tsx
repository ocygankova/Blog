import { Paper, PaperProps, styled } from '@mui/material';
import { ElementType } from 'react';

interface IProps {
  component?: ElementType;
  squareBreakpoint?: 'sm' | 'md' | 'lg';
}

const ResponsiveRoundedPaper = styled(Paper)<PaperProps & IProps>(
  ({ theme, squareBreakpoint }) => ({
    borderRadius: 20,
    overflow: 'hidden',

    [theme.breakpoints.down(squareBreakpoint || 'md')]: {
      borderRadius: 0,
    },
  })
);

export default ResponsiveRoundedPaper;
