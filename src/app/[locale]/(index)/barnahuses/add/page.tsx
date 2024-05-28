import { getBarnahuseLocations } from 'api/services/barnahuses'
import { getAssignableMasterAdmin } from 'api/services/masterAdmins'

import { AddBarnahus } from './AddBarnahus'

interface Props {
	searchParams: {
		location?: string
		masterAdmin?: string
	}
}

const AddBarnahusPage = async ({ searchParams }: Props) => {
	const barnahuseLocation = await getBarnahuseLocations(searchParams)
	const assignableMasterAdmin = await getAssignableMasterAdmin(searchParams)

	return (
		<AddBarnahus locations={barnahuseLocation?.data?.locations} masterAdmins={assignableMasterAdmin?.data?.users} />
	)
}

export default AddBarnahusPage
