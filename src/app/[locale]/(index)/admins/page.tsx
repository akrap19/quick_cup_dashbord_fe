import { ListLayoutWrapper } from '@/components/custom/layouts/ListLayoutWrapper'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { columns } from './columns'
import { dummyData } from './data'
import { Inputs } from './inputs'

const AdminsPage = () => {
	return (
		// <NoListData
		// 	title="Admins.noListDataTitle"
		// 	description="Admins.noListDataDescription"
		// 	buttonLabel="Admins.add"
		// 	buttonLink={ROUTES.ADD_ADMINS}
		// />
		<ListLayoutWrapper>
			<Inputs />
			<DataTable columns={columns} data={dummyData} />
		</ListLayoutWrapper>
	)
}

export default AdminsPage
