import { PageProps, Roles, UserData } from '@/types'
import Form from './Form'

interface EditProps extends PageProps {
	user: UserData
	roles: Roles[]
}

export default function Edit(props: EditProps) {
	return <Form {...props} />
}
