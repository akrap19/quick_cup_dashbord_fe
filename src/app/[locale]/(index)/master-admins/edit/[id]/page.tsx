import { getAssignableBarnahus } from 'api/services/barnahuses'
import { getMasterAdmin } from 'api/services/masterAdmins'

import MasterAdminEdit from './MasterAdminEdit'

interface Props {
	searchParams: {
		barnahus: string
	}
	params: { id: string }
}

const MasterAdminEditPage = async ({ searchParams, params }: Props) => {
	const assignableBarnahus = await getAssignableBarnahus(searchParams)
	const transformedBarnahusArray = assignableBarnahus.data.barnahuses?.map((barnahus: any) => {
		return {
			id: barnahus.barnahusId,
			name: barnahus.name
		}
	})
	const { data } = await getMasterAdmin(params.id)

	return <MasterAdminEdit masterAdmin={data.masterAdmin} barnahuses={transformedBarnahusArray} />
}

export default MasterAdminEditPage
