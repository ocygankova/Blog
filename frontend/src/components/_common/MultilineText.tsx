import { ReactNode } from "react";
import { Typography } from "@mui/material";

interface IProps {
  maxLines: number;
  children: ReactNode;
}

function MultilineText({ maxLines, children }: IProps) {
  return (
    <Typography
      sx={{
        whiteSpace: "pre-line",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: maxLines,
        wordWrap: "break-word",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {children}
    </Typography>
  );
}

export default MultilineText;
