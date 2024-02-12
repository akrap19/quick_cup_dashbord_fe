import type { ColumnDef } from '@tanstack/react-table'

export type MasterAdminsColumn = {
	id: string
	name: string
	location: string
}

export const columns: Array<ColumnDef<MasterAdminsColumn>> = [
	{ accessorKey: 'name', header: 'General.masterAdmin' },
	{ accessorKey: 'location', header: 'General.barnahusLocation' }
]
