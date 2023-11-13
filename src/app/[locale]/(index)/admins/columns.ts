import type { ColumnDef } from '@tanstack/react-table'

export type AdminsColumn = {
	admin: string
	barnahusLocation: string
}

export const columns: Array<ColumnDef<AdminsColumn>> = [
	{ accessorKey: 'admin', header: 'General.admin' },
	{ accessorKey: 'barnahusLocation', header: 'General.barnahusLocation' }
]
