import { IUser } from '@/models/user';

interface IProps {
  onUserUpdated: (updatedUser: IUser) => void;
}

function UpdateProfile({ onUserUpdated }: IProps) {
  return <div>UpdateProfile</div>;
}

export default UpdateProfile;
