'use client'

import { ListWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'
import { useNavbarItems } from '@/hooks/use-navbar-items'

import { columns } from './columns'
import { dummyData } from './data'
import { Inputs } from './inputs'

const AdminsPage = () => {
	useNavbarItems({ title: 'General.admins', useUserDropdown: true })

	return (
		// <NoListData
		// 	title="Admins.noListDataTitle"
		// 	description="Admins.noListDataDescription"
		// 	buttonLabel="Admins.add"
		// 	buttonLink={ROUTES.ADD_ADMINS}
		// />
		<ListWrapper>
			<Inputs />
			<DataTable columns={columns} data={dummyData} />
		</ListWrapper>
	)
}

export default AdminsPage
