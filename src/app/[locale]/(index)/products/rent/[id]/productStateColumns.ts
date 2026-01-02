import type { ColumnDef } from '@tanstack/react-table'

import { ProductState } from 'api/models/products/productState'

export const getProductStateColumns = (t: (key: string) => string): Array<ColumnDef<ProductState>> => [
	{ accessorKey: 'status', header: 'General.status' },
	{
		accessorKey: 'location',
		header: 'General.location',
		cell: ({ getValue }) => {
			const location = getValue() as string
			if (!location) return '-'
			return t(`Product.${location}`)
		}
	},
	{
		accessorKey: 'holder',
		header: 'General.holder',
		cell: ({ row }) => {
			const state = row.original
			return state.serviceLocation?.city
				? state.serviceLocation?.serviceName + ' - ' + state.serviceLocation?.city
				: state.user?.companyName || '-'
		}
	},
	{ accessorKey: 'quantity', header: 'General.quantity' }
]
