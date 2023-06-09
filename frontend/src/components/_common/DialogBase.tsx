import { ReactNode } from "react";
import { Dialog, DialogProps, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

function DialogBase({
  open,
  onClose,
  children,
  ...props
}: IProps & DialogProps) {
  return (
    <Dialog open={open} onClose={onClose} {...props}>
      <IconButton sx={{ alignSelf: "end", mb: 0.5 }} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      {children}
    </Dialog>
  );
}

export default DialogBase;
