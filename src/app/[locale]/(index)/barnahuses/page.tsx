import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { getBarnahuses } from 'api/services/barnahuses'
import { ROUTES } from 'parameters'

import { columns } from './columns'
import { Inputs } from './inputs'

const BarnahusesPage = async () => {
	const barnahuses = await getBarnahuses()

	return barnahuses?.length > 0 ? (
		<ListWrapper>
			<Inputs />
			<DataTable columns={columns} data={barnahuses} />
		</ListWrapper>
	) : (
		<NoListData
			navbarTitle=""
			title="NoListData.letsStart"
			description="Barnahuses.noListDataDescription"
			buttonLabel="Barnahuses.add"
			buttonLink={ROUTES.ADD_BARNAHUS}
		/>
	)
}

export default BarnahusesPage
