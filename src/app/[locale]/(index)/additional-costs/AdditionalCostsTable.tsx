'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

import { DataTable } from '@/components/data-display/data-table'

import { getColumns } from './columns'

interface Props {
	data: any[]
	pagination?: any
}

export const AdditionalCostsTable = ({ data, pagination }: Props) => {
	const t = useTranslations()
	const columns = useMemo(() => getColumns(t), [t])

	return <DataTable columns={columns} data={data ?? []} pagination={pagination} />
}
