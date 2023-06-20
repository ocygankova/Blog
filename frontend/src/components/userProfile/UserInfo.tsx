import { IUser } from '@/models/user';

interface IProps {
  user: IUser;
}

function UserInfo({ user: { username, displayName, about, profileImageUrl, createdAt } }: IProps) {
  return <div>{username}</div>;
}

export default UserInfo;
