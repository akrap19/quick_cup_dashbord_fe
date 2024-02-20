import type { ColumnDef } from '@tanstack/react-table'

import { CaseFiles } from 'api/models/caseFiles/caseFiles'

export const columns: Array<ColumnDef<CaseFiles>> = [
	{
		accessorKey: 'caseID',
		header: 'ID'
	},
	{
		accessorKey: 'status',
		header: 'Status'
	},

	{
		accessorKey: 'lastJourneySnapshot',
		header: 'Last Journey Snapshot'
	},
	{
		accessorKey: 'caseJourneyUpdates',
		header: 'Case Journey Updates'
	}
]
