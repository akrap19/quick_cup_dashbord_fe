import { DataTableWrapper } from '@/components/custom/data-table'
import { DataTable } from '@/components/custom/data-table/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { Inputs } from './inputs'

const BarnahusesPage = () => {
	const columns: Array<ColumnDef<any>> = [
		{ accessorKey: 'barnahus', header: 'General.barnahus' },
		{ accessorKey: 'location', header: 'General.location' },
		{ accessorKey: 'assignedAdmin', header: 'General.assignedAdmin' },
		{ accessorKey: 'numberOfPractitioners', header: 'General.numberOfPractitioners' }
	]
	const data = [
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

	return (
		// <NoListData
		// 	title="NoListData.letsStart"
		// 	description="Barnahuses.noListDataDescription"
		// 	buttonLabel="Barnahuses.add"
		// 	buttonLink={ROUTES.ADD_BARNAHUS}
		// />
		<DataTableWrapper>
			<Inputs />
			<DataTable columns={columns} data={data} />
		</DataTableWrapper>
	)
}

export default BarnahusesPage
