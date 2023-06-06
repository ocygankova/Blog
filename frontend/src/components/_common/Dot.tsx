import { Box } from "@mui/material";

interface IProps {
  bgcolor?: string;
}

function Dot({ bgcolor = "text.disabled" }: IProps) {
  return (
    <Box
      height="4px"
      width="4px"
      sx={{ borderRadius: "50%", backgroundColor: bgcolor }}
    />
  );
}

export default Dot;
