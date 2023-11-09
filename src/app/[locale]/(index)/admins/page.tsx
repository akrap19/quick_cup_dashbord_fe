import { DataTable } from '@/components/custom/data-table/DataTable'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { ROUTES } from 'parameters'
import { ComponentProps } from 'react'

type DataTableProps = ComponentProps<typeof DataTable>

const AdminsPage = () => {
	const dataTableData: DataTableProps = {
		searchPlaceholder: 'Admins.searchAdmin',
		buttonLabel: 'Admins.add',
		buttonLink: ROUTES.ADD_BARNAHUS,
		columns: [
			{ field: 'admin', label: 'General.barnahus', hasSort: true },
			{ field: 'barnahusLocation', label: 'General.location', hasSort: true }
		],
		data: [
			{
				admin: 'General.barnahus',
				barnahusLocation: 'Zagreb, croatia'
			},
			{
				admin: 'General.barnahus',
				barnahusLocation: 'Zagreb, croatia'
			},
			{
				admin: 'General.barnahus',
				barnahusLocation: 'Zagreb, croatia'
			},
			{
				admin: 'General.barnahus',
				barnahusLocation: 'Zagreb, croatia'
			}
		]
	}
	return (
		<NoListData
			title="Admins.noListDataTitle"
			description="Admins.noListDataDescription"
			buttonLabel="Admins.add"
			buttonLink={ROUTES.ADD_ADMINS}
		/>
		// <DataTable {...dataTableData} />
	)
}

export default AdminsPage
