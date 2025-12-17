import type { ColumnDef } from '@tanstack/react-table'

import { ServicePrice } from 'api/models/services/servicePrice'

export const priceColumns: Array<ColumnDef<ServicePrice>> = [
	{ accessorKey: 'minQuantity', header: 'General.minQuantity' },
	{ accessorKey: 'maxQuantity', header: 'General.maxQuantity' },
	{ accessorKey: 'price', header: 'General.price' }
]
