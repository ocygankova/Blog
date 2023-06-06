import NextLink from "next/link";
import { Link, Stack, Tooltip } from "@mui/material";
import { IUser } from "@/models/user";
import { UserAvatar } from "@/components";
import { formatDate } from "@/utils/utils";

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
        <strong>User since:</strong> {formatDate(createdAt)} <br />
        {about && (
          <>
            <strong>About:</strong> {about}
          </>
        )}
      </div>
    </Stack>
  );

  return (
    <>
      <NextLink href={profileLink}>
        <UserAvatar src={profileImageUrl} size="sm" />
      </NextLink>

      <Tooltip
        title={renderTooltipContent()}
        arrow
        placement="bottom-start"
        componentsProps={{
          tooltip: {
            sx: {
              p: 1,
              bgcolor: "background.paper",
              color: "text.primary",
              maxWidth: 200,
              boxShadow: "10",
              "& .MuiTooltip-arrow": {
                color: "background.paper",
              },
            },
          },
        }}
      >
        <Link
          component={NextLink}
          href={profileLink}
          sx={{ display: "inline-flex", alignItems: "center" }}
        >
          <Stack
            component="span"
            direction="row"
            spacing={1.5}
            alignItems="center"
          >
            <span>{displayName}</span>
          </Stack>
        </Link>
      </Tooltip>
    </>
  );
}

export default UserProfileLink;
