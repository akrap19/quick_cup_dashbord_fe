'use client'

import type { ColumnDef } from '@tanstack/react-table'

import { Order } from 'api/models/order/order'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

const getStatusDescriptionKey = (status: string, acquisitionType?: AcquisitionTypeEnum): string => {
	const statusMap: Record<string, string> = {
		PENDING: 'statusPendingDescription',
		ACCEPTED: 'statusAcceptedDescription',
		DECLINED: 'statusDeclinedDescription',
		PAYMENT_PENDING:
			acquisitionType === AcquisitionTypeEnum.RENT
				? 'statusPaymentPendingRentDescription'
				: 'statusPaymentPendingDescription',
		PAYMENT_RECEIVED: 'statusPaymentReceivedDescription',
		IN_PRODUCTION: 'statusInProductionDescription',
		READY: 'statusReadyDescription',
		IN_TRANSIT: 'statusInTransitDescription',
		FINAL_PAYMENT_PENDING: 'statusFinalPaymentPendingDescription',
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
		accessorFn: row => getStatusDescriptionKey(row.status, row.acquisitionType)
	}
]
