import type { ColumnDef } from '@tanstack/react-table'

import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'

export const getColumns = (t: (key: string) => string): Array<ColumnDef<AdditionalCosts>> => [
	{ accessorKey: 'name', header: 'AdditionalCosts.tableName' },
	{
		accessorKey: 'billingType',
		header: 'AdditionalCosts.billingType',
		cell: ({ getValue }) => {
			const value = getValue() as string
			return value ? t(`AdditionalCosts.${value}`) : ''
		}
	},
	{
		accessorKey: 'methodOfPayment',
		header: 'AdditionalCosts.methodOfPayment',
		cell: ({ getValue }) => {
			const value = getValue() as string
			return value ? t(`AdditionalCosts.${value}`) : ''
		}
	},
	{
		accessorKey: 'acquisitionType',
		header: 'AdditionalCosts.acquisitionType',
		cell: ({ getValue }) => {
			const value = getValue() as string
			return value ? t(`AdditionalCosts.${value}`) : ''
		}
	},
	{ accessorKey: 'price', header: 'AdditionalCosts.price' }
]
