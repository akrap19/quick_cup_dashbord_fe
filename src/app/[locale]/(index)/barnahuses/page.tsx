'use client'

import { ListWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'
import { useNavbarItems } from '@/hooks/use-navbar-items'

import { columns } from './columns'
import { dummyData } from './data'
import { Inputs } from './inputs'

const BarnahusesPage = () => {
	useNavbarItems({ title: 'General.barnahus', useUserDropdown: true })

	return (
		// <NoListData
		// 	title="NoListData.letsStart"
		// 	description="Barnahuses.noListDataDescription"
		// 	buttonLabel="Barnahuses.add"
		// 	buttonLink={ROUTES.ADD_BARNAHUS}
		// />
		<ListWrapper>
			<Inputs />
			<DataTable columns={columns} data={dummyData} />
		</ListWrapper>
	)
}

export default BarnahusesPage
