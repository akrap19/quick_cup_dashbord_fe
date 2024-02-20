import type { ColumnDef } from '@tanstack/react-table'

import { Admins } from 'api/models/admin/admins'

export const columns: Array<ColumnDef<Admins>> = [
	{ accessorKey: 'name', header: 'General.admin' },
	{ accessorKey: 'location', header: 'General.barnahusLocation' }
]
