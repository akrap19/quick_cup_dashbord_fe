import { DataTableHeader, DataTablePagination, DataTableWrapper, DataTable } from '@/components/custom/data-table'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { ROUTES } from 'parameters'
import { ComponentProps } from 'react'

type DataTableProps = ComponentProps<typeof DataTable>

const PractitionersPage = () => {
	const dataTableData: DataTableProps = {
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
		// <NoListData
		// 	title="NoListData.letsStart"
		// 	description="Practitioners.noListDataDescription"
		// 	buttonLabel="Practitioners.add"
		// 	buttonLink={ROUTES.ADD_ADMINS}
		// />
		<DataTableWrapper>
			<DataTableHeader
				buttonLabel={'Practitioners.add'}
				buttonLink={ROUTES.ADD_BARNAHUS}
				searchPlaceholder={'Practitioners.searchPractitioners'}
			/>
			<DataTable {...dataTableData} />
			<DataTablePagination />
		</DataTableWrapper>
	)
}

export default PractitionersPage
