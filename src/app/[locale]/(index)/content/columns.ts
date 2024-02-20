import type { ColumnDef } from '@tanstack/react-table'

export type ManageContentColumn = {
	contentType: string
	updated: string
	language: string
	status: string
}

export const columns: Array<ColumnDef<ManageContentColumn>> = [
	{ accessorKey: 'contentType', header: 'General.contentType' },
	{ accessorKey: 'updated', header: 'General.updated' },
	{ accessorKey: 'language', header: 'General.language' },
	{ accessorKey: 'status', header: 'General.status' }
]
