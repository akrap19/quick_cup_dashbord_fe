import { getAssignableBarnahus } from 'api/services/barnahuses'

import { MasterAdminAdd } from './MasterAdminAdd'

interface Props {
	searchParams: {
		barnahus: string
	}
}

const MaterAdminAddPage = async ({ searchParams }: Props) => {
	const assignableBarnahus = await getAssignableBarnahus(searchParams)
	const transformedBarnahusArray = assignableBarnahus.data.barnahuses?.map((barnahus: any) => {
		return {
			id: barnahus.barnahusId,
			name: barnahus.name
		}
	})

	return <MasterAdminAdd barnahuses={transformedBarnahusArray} />
}

export default MaterAdminAddPage
