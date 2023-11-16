import { ListWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'

import { columns } from './columns'
import { dummyData } from './data'
import { Inputs } from './inputs'

// type DataTableProps = ComponentProps<typeof DataTable>

const ManageContentPage = () => {
	return (
		// <NoListData
		// 	title="NoListData.letsStart"
		// 	description="ManageContent.noListDataDescription"
		// 	buttonLabel="ManageContent.add"
		// 	buttonLink={ROUTES.ADD_CONTENT}
		// />
		<ListWrapper>
			<Inputs />
			<DataTable columns={columns} data={dummyData} />
		</ListWrapper>
	)
}

export default ManageContentPage
