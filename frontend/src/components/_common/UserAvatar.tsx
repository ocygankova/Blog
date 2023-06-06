import { Avatar, AvatarProps } from "@mui/material";
import NextImage from "next/image";
import profileImgPlaceholder from "@/assets/profile-pic-placeholder.png";

interface IProps {
  src?: string;
  size?: "sm" | "md";
}
function UserAvatar({ src, size = "md", ...props }: IProps & AvatarProps) {
  const avatarSize = size === "sm" ? 28 : 40;

  return (
    <Avatar sx={{ width: avatarSize, height: avatarSize }} {...props}>
      <NextImage
        src={src || profileImgPlaceholder}
        alt="User profile picture"
        width={40}
        height={40}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    </Avatar>
  );
}

export default UserAvatar;
