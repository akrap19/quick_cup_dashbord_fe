import type { ColumnDef } from '@tanstack/react-table'
import { Barnahus } from 'api/models/barnahuses/barnahus'

export const columns: Array<ColumnDef<Barnahus>> = [
	{ accessorKey: 'name', header: 'General.barnahus' },
	{ accessorKey: 'location', header: 'General.location' },
	{ accessorKey: 'assignedAdmin', header: 'General.assignedAdmin' },
	{ accessorKey: 'numberOfPractitioners', header: 'General.numberOfPractitioners' }
]
