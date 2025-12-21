'use client'

import type { ColumnDef } from '@tanstack/react-table'

import { Order } from 'api/models/order/order'

const getStatusDescriptionKey = (status: string): string => {
	const statusMap: Record<string, string> = {
		PENDING: 'statusPendingDescription',
		ACCEPTED: 'statusAcceptedDescription',
		DECLINED: 'statusDeclinedDescription',
		PAYMENT_PENDING: 'statusPaymentPendingDescription',
		PAYMENT_RECEIVED: 'statusPaymentReceivedDescription',
		IN_PRODUCTION: 'statusInProductionDescription',
		READY: 'statusReadyDescription',
		IN_TRANSIT: 'statusInTransitDescription',
		COMPLETED: 'statusCompletedDescription'
	}
	return `Orders.${statusMap[status] || 'statusPendingDescription'}`
}

export const columns: Array<ColumnDef<Order>> = [
	{ accessorKey: 'orderNumber', header: 'Orders.tableOrderNumber' },
	{ accessorKey: 'status', header: 'General.status' },
	{
		id: 'statusDescription',
		header: 'General.statusDescription',
		accessorFn: row => getStatusDescriptionKey(row.status)
	}
]
