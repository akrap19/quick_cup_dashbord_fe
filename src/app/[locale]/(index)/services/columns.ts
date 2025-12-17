import type { ColumnDef } from '@tanstack/react-table'

import { Services } from 'api/models/services/Services'

export const columns: Array<ColumnDef<Services>> = [
	{ accessorKey: 'name', header: 'General.name' },
	{ accessorKey: 'locations', header: 'General.locations' }
]
