import type { ColumnDef } from '@tanstack/react-table'

export type PractitionersColumn = {
	practitioner: string
	role: string
}

export const columns: Array<ColumnDef<PractitionersColumn>> = [
	{ accessorKey: 'practitioner', header: 'General.practitioner' },
	{ accessorKey: 'role', header: 'General.role' }
]
