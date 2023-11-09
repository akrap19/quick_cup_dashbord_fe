import { DataTable } from '@/components/custom/data-table/DataTable'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { ROUTES } from 'parameters'
import { ComponentProps } from 'react'

type DataTableProps = ComponentProps<typeof DataTable>

const BarnahusesPage = () => {
	const dataTableData: DataTableProps = {
		searchPlaceholder: 'Barnahuses.searchBarnahus',
		buttonLabel: 'Barnahuses.add',
		buttonLink: ROUTES.ADD_BARNAHUS,
		columns: [
			{ field: 'barnahus', label: 'General.barnahus', hasSort: true },
			{ field: 'location', label: 'General.location', hasSort: true },
			{ field: 'assignedAdmin', label: 'General.assignedAdmin', hasSort: false },
			{ field: 'numberOfPractitioners', label: 'General.numberOfPractitioners', hasSort: false }
		],
		data: [
			{
				barnahus: 'General.barnahus',
				location: 'Zagreb, croatia',
				assignedAdmin: 'Ivan ivan',
				numberOfPractitioners: 666
			},
			{
				barnahus: 'General.barnahus',
				location: 'Zagreb, croatia',
				assignedAdmin: 'Ivan ivan',
				numberOfPractitioners: 666
			},
			{
				barnahus: 'General.barnahus',
				location: 'Zagreb, croatia',
				assignedAdmin: 'Ivan ivan',
				numberOfPractitioners: 666
			},
			{
				barnahus: 'General.barnahus',
				location: 'Zagreb, croatia',
				assignedAdmin: 'Ivan ivan',
				numberOfPractitioners: 666
			}
		]
	}

	return (
		<NoListData
			title="NoListData.letsStart"
			description="Barnahuses.noListDataDescription"
			buttonLabel="Barnahuses.add"
			buttonLink={ROUTES.ADD_BARNAHUS}
		/>
		// <DataTable {...dataTableData} />
	)
}

export default BarnahusesPage
