'use client'

import type { ColumnDef } from '@tanstack/react-table'

import { Templates } from 'api/models/template/templates'

export const columns: Array<ColumnDef<Templates>> = [
	{ accessorKey: 'name', header: 'General.template' },
	{ accessorKey: 'status', header: 'General.status' },
	{ accessorKey: 'updated', header: 'General.created' },
	{ accessorKey: 'addedBy', header: 'General.createdBy' },
	{
		accessorKey: 'isGeneral',
		header: 'Templates.isGeneralTitle',
		cell: ({ row }) => (row.original.isGeneral ? 'True' : 'False')
	}
]
