import { PageProps, Roles } from '@/types'
import Form from './Form'

interface CreateProps extends PageProps {
	roles: Roles[]
}

export default function Create(props: CreateProps) {
	return <Form {...props} />
}
