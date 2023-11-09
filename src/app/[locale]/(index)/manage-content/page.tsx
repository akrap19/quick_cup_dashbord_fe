import { DataTable } from '@/components/custom/data-table/DataTable'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { ROUTES } from 'parameters'
import { ComponentProps } from 'react'

type DataTableProps = ComponentProps<typeof DataTable>

const ManageContentPage = () => {
	const dataTableData: DataTableProps = {
		description: 'ManageContent.description',
		buttonLabel: 'ManageContent.add',
		buttonLink: ROUTES.ADD_BARNAHUS,
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
		<DataTable {...dataTableData} />
	)
}

export default ManageContentPage
