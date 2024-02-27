import { getBarnahus, getBarnahuseLocations } from 'api/services/barnahuses'
import { getAssignableMasterAdmin } from 'api/services/masterAdmins'

import BarnahusEdit from './BarnahusEdit'

interface Props {
	searchParams: {
		location?: string
		masterAdmin?: string
	}
	params: { id: string }
}

const BarnahusEditPage = async ({ searchParams, params }: Props) => {
	const { data } = await getBarnahus(params.id)
	const barnahuseLocation = await getBarnahuseLocations(searchParams)
	const assignableMasterAdmin = await getAssignableMasterAdmin(searchParams)

	return (
		<BarnahusEdit
			barnahus={data.barnahus}
			locations={barnahuseLocation?.data?.locations}
			masterAdmins={assignableMasterAdmin?.data?.users}
		/>
	)
}

export default BarnahusEditPage
