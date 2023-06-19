import NextLink from 'next/link';
import { Button, ButtonProps, styled } from '@mui/material';

//mui issue, will be fixed by https://github.com/mui/material-ui/pull/35924
interface IProps {
  component?: typeof NextLink;
}

const ButtonLink = styled(Button)<ButtonProps & IProps>(() => ({
  padding: '0 4px',
  minWidth: 'unset',
  borderRadius: 4,
}));

export default ButtonLink;
