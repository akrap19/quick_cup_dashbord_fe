import type { ColumnDef } from '@tanstack/react-table'

import { Order } from 'api/models/order/order'

export const columns: Array<ColumnDef<Order>> = [
	{ accessorKey: 'orderNumber', header: 'Orders.tableOrderNumber' },
	{ accessorKey: 'customerName', header: 'Orders.tableCustomerName' },
	{ accessorKey: 'status', header: 'General.status' }
]
