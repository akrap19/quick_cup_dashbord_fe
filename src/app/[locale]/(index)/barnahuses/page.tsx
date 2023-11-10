import { ListLayoutWrapper } from '@/components/custom/layouts/ListLayoutWrapper'
import { DataTable } from '@/components/data-display/data-table'
import { columns } from './columns'
import { dummyData } from './data'
import { Inputs } from './inputs'

const BarnahusesPage = () => {
	return (
		// <NoListData
		// 	title="NoListData.letsStart"
		// 	description="Barnahuses.noListDataDescription"
		// 	buttonLabel="Barnahuses.add"
		// 	buttonLink={ROUTES.ADD_BARNAHUS}
		// />
		<ListLayoutWrapper>
			<Inputs />
			<DataTable columns={columns} data={dummyData} />
		</ListLayoutWrapper>
	)
}

export default BarnahusesPage
