import { DataTableHeader, DataTablePagination, DataTableWrapper, DataTable } from '@/components/custom/data-table'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { ROUTES } from 'parameters'
import { ComponentProps } from 'react'

type DataTableProps = ComponentProps<typeof DataTable>

const ManageContentPage = () => {
	const dataTableData: DataTableProps = {
		columns: [
			{ field: 'contentType', label: 'General.contentType', hasSort: true },
			{ field: 'updated', label: 'General.updated' },
			{ field: 'language', label: 'General.language' },
			{ field: 'status', label: 'General.status' }
		],
		data: [
			{
				contentType: 'General.barnahus',
				updated: 'General.barnahus',
				language: 'General.barnahus',
				status: 'Zagreb, croatia'
			},
			{
				contentType: 'General.barnahus',
				updated: 'General.barnahus',
				language: 'General.barnahus',
				status: 'Zagreb, croatia'
			},
			{
				contentType: 'General.barnahus',
				updated: 'General.barnahus',
				language: 'General.barnahus',
				status: 'Zagreb, croatia'
			},
			{
				contentType: 'General.barnahus',
				updated: 'General.barnahus',
				language: 'General.barnahus',
				status: 'Zagreb, croatia'
			}
		]
	}
	return (
		// <NoListData
		// 	title="NoListData.letsStart"
		// 	description="ManageContent.noListDataDescription"
		// 	buttonLabel="ManageContent.add"
		// 	buttonLink={ROUTES.ADD_CONTENT}
		// />
		<DataTableWrapper>
			<DataTableHeader
				buttonLabel={'Barnahuses.add'}
				buttonLink={ROUTES.ADD_BARNAHUS}
				description={'ManageContent.description'}
			/>
			<DataTable {...dataTableData} />
			<DataTablePagination />
		</DataTableWrapper>
	)
}

export default ManageContentPage
