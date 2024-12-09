import type { ColumnDef } from '@tanstack/react-table'

import { Admins } from 'api/models/admin/Admins'

export const columns: Array<ColumnDef<Admins>> = [
	{ accessorKey: 'customId', header: 'General.caseId' },
	{ accessorKey: 'canAddNotes', header: 'General.notes' }
]
