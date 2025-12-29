import type { ColumnDef } from '@tanstack/react-table'

import { ProductState } from 'api/models/products/productState'

export const productStateColumns: Array<ColumnDef<ProductState>> = [
	{ accessorKey: 'status', header: 'General.status' },
	{ accessorKey: 'location', header: 'General.location' },
	{ accessorKey: 'quantity', header: 'General.quantity' },
	{
		accessorKey: 'holder',
		header: 'General.holder',
		cell: ({ row }) => {
			const state = row.original
			// Display serviceId or userId based on location
			return state.serviceId || state.userId || '-'
		}
	}
]
