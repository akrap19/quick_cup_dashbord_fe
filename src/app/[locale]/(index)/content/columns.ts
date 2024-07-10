import type { ColumnDef } from '@tanstack/react-table'

export type ManageContentColumn = {
	aboutId: string
	aboutTranslationId: string
	roomId: string
	roomTranslationId: string
	staffId: string
	staffTranslationId: string
	contentType: string
	updated: string
	status: string
}

export const columns: Array<ColumnDef<ManageContentColumn>> = [
	{ accessorKey: 'name', header: 'General.contentType' },
	{ accessorKey: 'updated', header: 'General.updated' },
	{ accessorKey: 'status', header: 'General.status' }
]
