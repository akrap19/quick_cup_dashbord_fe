'use client'

import type { ColumnDef } from '@tanstack/react-table'

import { Event } from 'api/models/event/event'
import { formatDate } from '@/utils/formatDate'

export const columns: Array<ColumnDef<Event>> = [
	{ accessorKey: 'title', header: 'Events.tableName' },
	{
		accessorKey: 'startDate',
		header: 'Events.startDate',
		cell: ({ getValue }) => {
			const value = getValue() as string | null
			return value ? formatDate(value) : '-'
		}
	},
	{
		accessorKey: 'endDate',
		header: 'Events.endDate',
		cell: ({ getValue }) => {
			const value = getValue() as string | null
			return value ? formatDate(value) : '-'
		}
	},
	{ accessorKey: 'location', header: 'General.location' }
]
