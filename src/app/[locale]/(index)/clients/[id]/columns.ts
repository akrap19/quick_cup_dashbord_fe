import type { ColumnDef } from '@tanstack/react-table'

import { ProductPrice } from 'api/models/products/productPrice'

export const columns: Array<ColumnDef<ProductPrice>> = [
	{ accessorKey: 'minQuantity', header: 'General.minQuantity' },
	{ accessorKey: 'maxQuantity', header: 'General.maxQuantity' },
	{ accessorKey: 'price', header: 'General.price' }
]
