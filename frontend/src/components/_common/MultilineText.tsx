import { ReactNode } from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface IProps {
  maxLines: number;
  children: ReactNode;
}

function MultilineText({ maxLines, children, ...props }: IProps & TypographyProps) {
  return (
    <Typography
      sx={{
        whiteSpace: 'pre-line',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: maxLines,
        wordWrap: 'break-word',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      {...props}>
      {children}
    </Typography>
  );
}

export default MultilineText;
