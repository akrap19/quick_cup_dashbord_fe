import type { ColumnDef } from '@tanstack/react-table'

import { Barnahus } from 'api/models/barnahuses/barnahus'

export const columns: Array<ColumnDef<Barnahus>> = [
	{ accessorKey: 'name', header: 'General.language' },
	{ accessorKey: 'status', header: 'General.status' }
]
