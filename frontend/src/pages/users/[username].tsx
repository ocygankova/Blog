import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Container, Divider } from '@mui/material';
import * as UsersApi from '@/http/api/users';
import { NotFoundError } from '@/http/http-errors';
import { IUser } from '@/models/user';
import { useAuthenticatedUser } from '@/hooks';
import { UpdateProfile, UserInfo, UserPosts } from '@/components';

export const getServerSideProps: GetServerSideProps<IPageProps> = async ({ params }) => {
  try {
    const username = params?.username?.toString();
    if (!username) throw Error('Username missing');

    const user = await UsersApi.getUserByUsername(username);
    return { props: { user } };
  } catch (err) {
    if (err instanceof NotFoundError) {
      return { notFound: true };
    } else {
      throw err;
    }
  }
};

interface IPageProps {
  user: IUser;
}

// a wrapper component so we can pass key
function UserProfilePage({ user }: IPageProps) {
  return <UserProfile user={user} key={user._id} />;
}

export default UserProfilePage;

function UserProfile({ user }: IPageProps) {
  const { user: loggedInUser, mutateUser: mutateLoggedInUser } = useAuthenticatedUser();

  const [profileUser, setProfileUser] = useState<IUser>(user);

  const profileUserIsLoggedInUser: boolean =
    (loggedInUser && loggedInUser._id === profileUser._id) || false;

  const handleUserUpdated = (updatedUser: IUser) => {
    mutateLoggedInUser(updatedUser);
    setProfileUser(updatedUser);
  };

  return (
    <>
      <Head>
        <title>{`${profileUser.displayName} - Blog`}</title>
      </Head>
      <Container sx={{ pt: 12 }}>
        <UserInfo user={profileUser} />

        <Divider />

        {profileUserIsLoggedInUser && (
          <>
            <UpdateProfile onUserUpdated={handleUserUpdated} />
            <Divider />
          </>
        )}
      </Container>

      <UserPosts user={profileUser} />
    </>
  );
}
