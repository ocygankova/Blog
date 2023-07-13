import { ReactNode } from 'react';
import { Box, Dialog, DialogProps, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { MdClose } from 'react-icons/md';

interface IProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

function DialogBase({ open, onClose, children, ...props }: IProps & DialogProps) {
  const theme = useTheme();
  const widthSmDown = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  return (
    <Dialog open={open} onClose={onClose} fullScreen={widthSmDown} {...props}>
      <IconButton sx={{ alignSelf: 'end', mt: 1, mr: 1 }} color="inherit" onClick={onClose}>
        <MdClose />
      </IconButton>
      <Box px={4} pb={4} pt={{ xs: 2, sm: 1 }}>
        {children}
      </Box>
    </Dialog>
  );
}

export default DialogBase;
