import type { ColumnDef } from '@tanstack/react-table'

import { CaseFiles } from 'api/models/caseFiles/caseFiles'

export const columns: Array<ColumnDef<CaseFiles>> = [
	{
		accessorKey: 'customId',
		header: 'CaseFiles.customId'
	},
	{
		accessorKey: 'status',
		header: 'General.status'
	},

	{
		accessorKey: 'lastJourneySnapshot',
		header: 'General.lastJourneySnapshot'
	},
	{
		accessorKey: 'caseJourneyUpdates',
		header: 'General.caseJourneyUpdates'
	}
]
