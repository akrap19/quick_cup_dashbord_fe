import type { ColumnDef } from '@tanstack/react-table'

import { Services } from 'api/models/services/Services'

export const columns: Array<ColumnDef<Services>> = [
	{ accessorKey: 'name', header: 'General.service' },
	{ accessorKey: 'email', header: 'General.email' },
	{ accessorKey: 'phoneNumber', header: 'General.phoneNumber' }
]
