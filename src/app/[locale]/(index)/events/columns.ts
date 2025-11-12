import type { ColumnDef } from '@tanstack/react-table'

import { Event } from 'api/models/event/event'

export const columns: Array<ColumnDef<Event>> = [
	{ accessorKey: 'title', header: 'Events.tableName' },
	{ accessorKey: 'startDate', header: 'Events.startDate' },
	{ accessorKey: 'endDate', header: 'Events.endDate' },
	{ accessorKey: 'location', header: 'General.location' }
]
