import { PageProps, RegionData } from '@/types'
import Form from './Form'

interface EditProps extends PageProps {
	region: RegionData
}

export default function Edit(props: EditProps) {
	return <Form {...props} />
}
