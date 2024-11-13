import type { ColumnDef } from '@tanstack/react-table'

import { CaseFiles } from 'api/models/caseFiles/caseFiles'

export const columns: Array<ColumnDef<CaseFiles>> = [
	{
		accessorKey: 'customId',
		header: 'CaseFiles.customId'
	},
	{
		accessorKey: 'canAddNotes',
		header: 'General.notes'
	}
]
