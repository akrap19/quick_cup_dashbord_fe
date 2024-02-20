import type { ColumnDef } from '@tanstack/react-table'

import { Practitioners } from 'api/models/practitioners/practitioners'

export const columns: Array<ColumnDef<Practitioners>> = [
	{ accessorKey: 'practitioner', header: 'General.practitioner' },
	{ accessorKey: 'role', header: 'General.role' }
]
