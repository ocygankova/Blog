import NextLink from 'next/link';
import { Link, LinkProps } from '@mui/material';

interface IProps {
  href: string;
  text: string;
}

function TitleLink({ href, text, ...props }: IProps & LinkProps) {
  return (
    <Link
      component={NextLink}
      href={href}
      variant="h3"
      color="inherit"
      my={2}
      display="inline-block"
      sx={{
        transition: 'ease 0.1s',
        '&:hover': {
          color: 'primary.main',
        },
      }}
      {...props}>
      {text}
    </Link>
  );
}

export default TitleLink;
