import { DataTableWrapper, DataTableHeader, DataTablePagination } from '@/components/custom/data-table'
import { DataTable } from '@/components/custom/data-table/DataTable'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { ROUTES } from 'parameters'
import { ComponentProps } from 'react'

type DataTableProps = ComponentProps<typeof DataTable>

const CaseFilesPage = () => {
	const dataTableData: DataTableProps = {
		columns: [
			{ field: 'id', label: 'General.id' },
			{ field: 'status', label: 'General.status' },
			{ field: 'lastJourneySnapshot', label: 'General.lastJourneySnapshot' },
			{ field: 'caseJourneyUpdates', label: 'General.caseJourneyUpdates' }
		],
		data: [
			{
				id: 'General.barnahus',
				status: 'Zagreb, croatia',
				lastJourneySnapshot: 'Ivan ivan',
				caseJourneyUpdates: 666
			},
			{
				id: 'General.barnahus',
				status: 'Zagreb, croatia',
				lastJourneySnapshot: 'Ivan ivan',
				caseJourneyUpdates: 666
			},
			{
				id: 'General.barnahus',
				status: 'Zagreb, croatia',
				lastJourneySnapshot: 'Ivan ivan',
				caseJourneyUpdates: 666
			},
			{
				id: 'General.barnahus',
				status: 'Zagreb, croatia',
				lastJourneySnapshot: 'Ivan ivan',
				caseJourneyUpdates: 666
			}
		]
	}

	return (
		// <NoListData
		// 	title="NoListData.letsStart"
		// 	description="CaseFiles.noListDataDescription"
		// 	buttonLabel="CaseFiles.add"
		// 	buttonLink={ROUTES.ADD_CASE}
		// />
		<DataTableWrapper>
			<DataTableHeader
				buttonLabel={'CaseFiles.add'}
				buttonLink={ROUTES.ADD_BARNAHUS}
				searchPlaceholder={'CaseFiles.searchCase'}
				selectOptions={[{ value: 'all', label: 'All statuses' }]}
			/>
			<DataTable {...dataTableData} />
			<DataTablePagination />
		</DataTableWrapper>
	)
}

export default CaseFilesPage
