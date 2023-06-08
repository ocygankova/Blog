import { Button, ButtonProps, styled } from "@mui/material";
import Link from "next/link";

//mui issue, will be fixed by https://github.com/mui/material-ui/pull/35924
interface IProps {
  component?: typeof Link;
}

const ButtonPill = styled(Button)<ButtonProps & IProps>(() => ({
  borderRadius: "18px",
}));

export default ButtonPill;
