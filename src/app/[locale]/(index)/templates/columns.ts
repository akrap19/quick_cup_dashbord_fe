import type { ColumnDef } from '@tanstack/react-table'

import { Admins } from 'api/models/admin/Admins'

export const columns: Array<ColumnDef<Admins>> = [
	{ accessorKey: 'name', header: 'General.template' },
	{ accessorKey: 'status', header: 'General.status' },
	{ accessorKey: 'updated', header: 'General.created' }
]
