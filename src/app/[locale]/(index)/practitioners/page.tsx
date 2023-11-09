import { DataTable } from '@/components/custom/data-table/DataTable'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { Text } from '@/components/typography/text'
import { ROUTES } from 'parameters'
import { ComponentProps } from 'react'

type DataTableProps = ComponentProps<typeof DataTable>

const PractitionersPage = () => {
	const dataTableData: DataTableProps = {
		searchPlaceholder: 'Practitioners.searchPractitioners',
		buttonLabel: 'Practitioners.add',
		buttonLink: ROUTES.ADD_BARNAHUS,
		columns: [
			{ field: 'practitioner', label: 'General.practitioner', hasSort: true },
			{ field: 'role', label: 'General.role' }
		],
		data: [
			{
				practitioner: 'General.barnahus',
				role: 'Zagreb, croatia'
			},
			{
				practitioner: 'General.barnahus',
				role: 'Zagreb, croatia'
			},
			{
				practitioner: 'General.barnahus',
				role: 'Zagreb, croatia'
			},
			{
				practitioner: 'General.barnahus',
				role: 'Zagreb, croatia'
			}
		]
	}
	return (
		<NoListData
			title="NoListData.letsStart"
			description="Practitioners.noListDataDescription"
			buttonLabel="Practitioners.add"
			buttonLink={ROUTES.ADD_ADMINS}
		/>
		// <DataTable {...dataTableData} />
	)
}

export default PractitionersPage
