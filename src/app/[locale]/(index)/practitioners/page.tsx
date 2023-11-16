import { ListWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'

import { columns } from './columns'
import { dummyData } from './data'
import { Inputs } from './inputs'

const PractitionersPage = () => {
	return (
		// <NoListData
		// 	title="NoListData.letsStart"
		// 	description="Practitioners.noListDataDescription"
		// 	buttonLabel="Practitioners.add"
		// 	buttonLink={ROUTES.ADD_ADMINS}
		// />
		<ListWrapper>
			<Inputs />
			<DataTable columns={columns} data={dummyData} />
		</ListWrapper>
	)
}

export default PractitionersPage
