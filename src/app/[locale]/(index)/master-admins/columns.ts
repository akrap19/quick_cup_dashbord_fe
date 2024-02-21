import type { ColumnDef } from '@tanstack/react-table'

import { Admins } from 'api/models/admin/Admins'

export const columns: Array<ColumnDef<Admins>> = [
	{ accessorKey: 'name', header: 'General.masterAdmin' },
	{ accessorKey: 'location', header: 'General.barnahusLocation' }
]
