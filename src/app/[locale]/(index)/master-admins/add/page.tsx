import { getAssignableBarnahus } from 'api/services/barnahuses'

import { MasterAdminAdd } from './MasterAdminAdd'

const MaterAdminAddPage = async () => {
	const assignableBarnahus = await getAssignableBarnahus()
	const transformedBarnahusArray = assignableBarnahus.data.barnahuses?.map((barnahus: any) => {
		return {
			id: barnahus.barnahusId,
			name: barnahus.name
		}
	})

	return <MasterAdminAdd barnahuses={transformedBarnahusArray} />
}

export default MaterAdminAddPage
