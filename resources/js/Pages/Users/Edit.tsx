import { PageProps, Roles, UserData } from '@/types';
import UserForm from './Form';

interface EditUserProps extends PageProps {
  user: UserData;
  roles: Roles[];
}

export default function Edit(props: EditUserProps) {
  return <UserForm {...props} />;
} 