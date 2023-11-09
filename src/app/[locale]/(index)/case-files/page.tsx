import { DataTable } from '@/components/custom/data-table/DataTable'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { ROUTES } from 'parameters'
import { ComponentProps } from 'react'

type DataTableProps = ComponentProps<typeof DataTable>

const CaseFilesPage = () => {
	const dataTableData: DataTableProps = {
		selectOptions: [{ value: 'all', label: 'All statuses' }],
		searchPlaceholder: 'CaseFiles.searchCase',
		buttonLabel: 'CaseFiles.add',
		buttonLink: ROUTES.ADD_BARNAHUS,
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
		<DataTable {...dataTableData} />
	)
}

export default CaseFilesPage
