import type { ColumnDef } from '@tanstack/react-table'

import { Product } from 'api/models/products/product'

export const columns: Array<ColumnDef<Product>> = [
	{ accessorKey: 'name', header: 'General.name' },
	{ accessorKey: 'description', header: 'General.description' }
]
