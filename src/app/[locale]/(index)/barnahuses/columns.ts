import type { ColumnDef } from '@tanstack/react-table'

export type BarnahusesColumn = {
	barnahus: string
	location: string
	assignedAdmin: string
	numberOfPractitioners: number
}

export const columns: Array<ColumnDef<BarnahusesColumn>> = [
	{ accessorKey: 'barnahus', header: 'General.barnahus' },
	{ accessorKey: 'location', header: 'General.location' },
	{ accessorKey: 'assignedAdmin', header: 'General.assignedAdmin' },
	{ accessorKey: 'numberOfPractitioners', header: 'General.numberOfPractitioners' }
]
