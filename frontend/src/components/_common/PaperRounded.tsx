import { Paper, PaperProps, styled } from "@mui/material";

const PaperRounded = styled(Paper)<PaperProps>(() => ({
  borderRadius: "18px",
  overflow: "hidden",
}));

export default PaperRounded;
