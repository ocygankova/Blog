import { Button, ButtonProps, styled } from "@mui/material";
import Link from "next/link";

//mui issue, will be fixed by https://github.com/mui/material-ui/pull/35924
interface IProps {
  component?: typeof Link;
}

const ButtonLink = styled(Button)<ButtonProps & IProps>(() => ({
  padding: "0 4px",
  minWidth: "unset",
  borderRadius: 4,
}));

export default ButtonLink;
