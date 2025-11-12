import type { ColumnDef } from '@tanstack/react-table'

import { Clients } from 'api/models/clients/clients'

export const columns: Array<ColumnDef<Clients>> = [
	{ accessorKey: 'name', header: 'General.client' },
	{ accessorKey: 'email', header: 'General.email' },
	{ accessorKey: 'phoneNumber', header: 'General.phoneNumber' },
	{ accessorKey: 'status', header: 'General.status' }
]
