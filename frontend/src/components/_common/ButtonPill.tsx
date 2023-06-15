import NextLink from 'next/link';
import { Button, ButtonProps, styled } from '@mui/material';

//mui issue, will be fixed by https://github.com/mui/material-ui/pull/35924
interface IProps {
  component?: typeof NextLink;
}

const ButtonPill = styled(Button)<ButtonProps & IProps>(() => ({
  borderRadius: '18px',
}));

export default ButtonPill;
