import { getAssignableBarnahus } from 'api/services/barnahuses'
import { getMasterAdmin } from 'api/services/masterAdmins'

import MasterAdminEdit from './MasterAdminEdit'

const MasterAdminEditPage = async ({ params }: { params: { id: string } }) => {
	const assignableBarnahus = await getAssignableBarnahus()
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
