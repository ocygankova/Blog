import NextLink from 'next/link';
import { Stack, StackProps, Tooltip, Typography, TypographyVariant } from '@mui/material';
import { IUser } from '@/models/user';
import { ButtonLink, UserAvatar } from '@/components';
import { formatDate } from '@/utils/utils';

interface IProps {
  user: IUser;
  avatarSize?: 'sm' | 'md';
  typography?: TypographyVariant;
  color?: 'primary' | 'secondary';
}

function UserProfileLink({
  user: { username, displayName, about, profileImageUrl, createdAt },
  avatarSize = 'sm',
  typography = 'caption',
  color = 'secondary',
  ...props
}: IProps & StackProps) {
  const profileLink = `/users/${username}`;

  const renderTooltipContent = () => (
    <Stack spacing={2} alignItems="center">
      <NextLink href={profileLink}>
        <UserAvatar src={profileImageUrl} size="lg" />
      </NextLink>

      <div>
        <Typography>
          <Typography component="span" variant="h6" lineHeight="inherit">
            User since:{' '}
          </Typography>
          {formatDate(createdAt)}
        </Typography>

        {about && (
          <Typography>
            <Typography component="span" variant="h6">
              About me:{' '}
            </Typography>
            {about}
          </Typography>
        )}
      </div>
    </Stack>
  );

  return (
    <Stack direction="row" component="span" spacing={0.5} alignItems="center" {...props}>
      <Tooltip
        title={renderTooltipContent()}
        placement="bottom-start"
        enterDelay={300}
        enterNextDelay={300}
        leaveDelay={300}
        componentsProps={{
          tooltip: {
            sx: {
              p: 1.5,
              bgcolor: 'background.paper',
              color: 'text.primary',
              maxWidth: 340,
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
        <NextLink href={profileLink}>
          <UserAvatar src={profileImageUrl} size={avatarSize} />
        </NextLink>
      </Tooltip>

      <ButtonLink
        color={color}
        component={NextLink}
        href={profileLink}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          typography: typography,
        }}>
        {displayName}
      </ButtonLink>
    </Stack>
  );
}

export default UserProfileLink;
