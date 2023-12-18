'use client'

import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useBarnahuses } from 'api/queries/barnahusQueries'
import { ROUTES } from 'parameters'

import { columns } from './columns'
import { Inputs } from './inputs'

const BarnahusesPage = () => {
	useNavbarItems({ title: 'General.barnahuses', useUserDropdown: true })
	const { barnahuses } = useBarnahuses()

	return barnahuses?.length > 0 ? (
		<ListWrapper>
			<Inputs />
			<DataTable columns={columns} data={barnahuses} />
		</ListWrapper>
	) : (
		<NoListData
			title="NoListData.letsStart"
			description="Barnahuses.noListDataDescription"
			buttonLabel="Barnahuses.add"
			buttonLink={ROUTES.ADD_BARNAHUS}
		/>
	)
}

export default BarnahusesPage
