import { IUser } from '@/models/user';

interface IProps {
  user: IUser;
}

function UserPosts({ user }: IProps) {
  return <div>UserPosts</div>;
}

export default UserPosts;
