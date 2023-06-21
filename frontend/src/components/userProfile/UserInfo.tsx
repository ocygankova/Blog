import { IUser } from '@/models/user';
import { Stack, Typography } from '@mui/material';
import { UserAvatar } from '@/components';
import { formatDate } from '@/utils';

interface IProps {
  user: IUser;
}

function UserInfo({ user: { username, displayName, about, profileImageUrl, createdAt } }: IProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
      <UserAvatar
        src={profileImageUrl}
        size="xl"
        variant="rounded"
        imagePriority={true}
        imageQuality={90}
        sxAvatar={{ alignSelf: 'center' }}
      />

      <Stack spacing={1}>
        <Typography variant="h2" component="h1">
          {displayName}
        </Typography>

        <Typography>
          <Typography component="span" variant="h6">
            Username:{' '}
          </Typography>
          {username}
        </Typography>

        <Typography>
          <Typography component="span" variant="h6">
            User since:{' '}
          </Typography>
          {formatDate(createdAt)}
        </Typography>

        <Typography>
          <Typography component="span" variant="h6">
            About me:{' '}
          </Typography>
          {about || "This user hasn't provided any info yet"}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default UserInfo;
