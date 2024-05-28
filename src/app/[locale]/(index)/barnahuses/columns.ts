import type { ColumnDef } from '@tanstack/react-table'

import { Barnahus } from 'api/models/barnahuses/barnahus'

export const columns: Array<ColumnDef<Barnahus>> = [
	{ accessorKey: 'name', header: 'General.barnahus' },
	{ accessorKey: 'location', header: 'General.location' },
	{ accessorKey: 'locationCode', header: 'General.barnahusId' },
	{ accessorKey: 'admin', header: 'Barnahuses.assignedMasterAdmin' }
]
