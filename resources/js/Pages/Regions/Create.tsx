import { PageProps } from '@/types'
import Form from './Form'

interface CreateProps extends PageProps {}

export default function Create(props: CreateProps) {
	return <Form {...props} />
}
