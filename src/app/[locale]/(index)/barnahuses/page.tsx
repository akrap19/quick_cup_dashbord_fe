import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { getBarnahuses } from 'api/services/barnahuses'
import { ROUTES } from 'parameters'

import { columns } from './columns'
import { Inputs } from './inputs'

interface Props {
	searchParams: {
		search: string
		page: number
		limit: number
	}
}

const BarnahusesPage = async ({ searchParams }: Props) => {
	const { data } = await getBarnahuses(searchParams)
	const isInitialListEmpty = data?.barnahuses.length === 0 && !searchParams.search

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.barnahus"
			title="NoListData.letsStart"
			description="Barnahuses.noListDataDescription"
			buttonLabel="Barnahuses.add"
			buttonLink={ROUTES.ADD_BARNAHUS}
		/>
	) : (
		<ListWrapper>
			<Inputs data={data?.barnahuses} />
			<DataTable columns={columns} data={replaceNullInListWithDash(data?.barnahuses)} />
		</ListWrapper>
	)
}

export default BarnahusesPage
