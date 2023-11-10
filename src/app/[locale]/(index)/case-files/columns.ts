import type { ColumnDef } from '@tanstack/react-table'

export type PeopleColumn = {
	id: string
	status: string
	snapshot: string
	updates: string
}

export const columns: Array<ColumnDef<PeopleColumn>> = [
	{
		accessorKey: 'id',
		header: 'ID'
	},
	{
		accessorKey: 'status',
		header: 'Status'
	},

	{
		accessorKey: 'snapshot',
		header: 'Last Journey Snapshot'
	},
	{
		accessorKey: 'updates',
		header: 'Case Journey Updates'
	}
]
