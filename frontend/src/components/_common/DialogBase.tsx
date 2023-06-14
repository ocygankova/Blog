import { ReactNode } from 'react';
import { Box, Dialog, DialogProps, IconButton, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
      <IconButton sx={{ alignSelf: 'end', mt: 1, mr: 1 }} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <Box px={4} pb={4} pt={1}>
        {children}
      </Box>
    </Dialog>
  );
}

export default DialogBase;
