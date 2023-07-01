import { Avatar, AvatarProps } from '@mui/material';
import NextImage from 'next/image';
import profileImgPlaceholder from '@/assets/profile-pic-placeholder.png';

interface IProps {
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  imagePriority?: boolean;
  imageQuality?: number;
  sxAvatar?: AvatarProps['sx'];
}
function UserAvatar({
  src,
  imagePriority,
  sxAvatar,
  imageQuality = 95,
  size = 'md',
  ...props
}: IProps & AvatarProps) {
  const avatarSize = size === 'sm' ? 28 : size === 'md' ? 40 : size === 'lg' ? 140 : 240;
  const avatarSx = { width: avatarSize, height: avatarSize, ...sxAvatar };

  return (
    <Avatar sx={avatarSx} {...props}>
      <NextImage
        src={src || profileImgPlaceholder}
        alt="User profile picture"
        width={size === 'sm' ? 40 : avatarSize}
        height={size === 'sm' ? 40 : avatarSize}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        priority={imagePriority}
        quality={imageQuality}
      />
    </Avatar>
  );
}

export default UserAvatar;
