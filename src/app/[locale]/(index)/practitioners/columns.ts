import type { ColumnDef } from '@tanstack/react-table'

import { Practitioners } from 'api/models/practitioners/practitioners'

export const columns: Array<ColumnDef<Practitioners>> = [
	{ accessorKey: 'name', header: 'General.practitioner' },
	{ accessorKey: 'userProfession', header: 'General.role' },
	{ accessorKey: 'assignedBy', header: 'General.assignedBy' }
]
