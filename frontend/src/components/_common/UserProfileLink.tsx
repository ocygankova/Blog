import NextLink from 'next/link';
import { Stack, Tooltip, Typography } from '@mui/material';
import { IUser } from '@/models/user';
import { ButtonLink, UserAvatar } from '@/components';
import { formatDate } from '@/utils/utils';

interface IProps {
  user: IUser;
}

function UserProfileLink({
  user: { username, displayName, about, profileImageUrl, createdAt },
}: IProps) {
  const profileLink = `/users/${username}`;

  const renderTooltipContent = () => (
    <Stack spacing={2} alignItems="center">
      <NextLink href={profileLink}>
        <UserAvatar src={profileImageUrl} size="lg" />
      </NextLink>

      <div>
        <Typography mb={1}>
          <strong>User since:</strong> {formatDate(createdAt)}
        </Typography>
        {about && (
          <Typography>
            <strong>About:</strong> {about}
          </Typography>
        )}
      </div>
    </Stack>
  );

  return (
    <Stack direction="row" component="span" spacing={1} alignItems="center">
      <NextLink href={profileLink}>
        <UserAvatar src={profileImageUrl} size="sm" />
      </NextLink>

      <Tooltip
        title={renderTooltipContent()}
        placement="bottom-start"
        enterDelay={400}
        enterNextDelay={400}
        componentsProps={{
          tooltip: {
            sx: {
              p: 1.5,
              bgcolor: 'background.paper',
              color: 'text.primary',
              maxWidth: 260,
              boxShadow: '10',
              '& .MuiTooltip-arrow': {
                color: 'background.paper',
              },
              '&.MuiTooltip-tooltip': {
                '&.MuiTooltip-tooltipPlacementBottom': {
                  marginTop: '6px',
                },
              },
            },
          },
        }}>
        <ButtonLink
          color="secondary"
          component={NextLink}
          href={profileLink}
          sx={{ display: 'inline-flex', alignItems: 'center' }}>
          {displayName}
        </ButtonLink>
      </Tooltip>
    </Stack>
  );
}

export default UserProfileLink;
