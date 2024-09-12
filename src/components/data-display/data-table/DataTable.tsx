'use client'

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable
} from '@tanstack/react-table'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useEffect, useState } from 'react'

import { Table } from '@/components/data-display/table/Table'
import { useTable } from '@/hooks/use-table'
import { useTableStore } from '@/store/table'
import { getObjectLength } from '@/utils/getObjectLength'
import { Pagination } from 'api/models/common/pagination'

import { DataTableBody } from './DataTableBody'
import { DataTableHeader } from './DataTableHeader'
import { DataTablePagination } from './DataTablePagination'

interface Props<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	pagination?: Pagination
}

export const DataTable = <TData, TValue>({ columns, data, pagination }: Props<TData, TValue>) => {
	const { checkedItems } = useTableStore()
	const searchParams = useSearchParams()
	const { replace } = useRouter()
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [rowSelection, setRowSelection] = useState({})
	const [sorting, setSorting] = useState<SortingState>([])
	useTable(rowSelection)

	const handleQueryParams = (field: string, value: string) => {
		const current = qs.parse(searchParams.toString())
		const query = { ...current, [field]: value }

		const url = qs.stringifyUrl(
			{
				url: window.location.href,
				query
			},
			{ skipEmptyString: true }
		)

		replace(url)
	}

	const table = useReactTable({
		data,
		columns,
		// eslint-disable-next-line
		pageCount: pagination ? Math.ceil(pagination?.count / pagination?.limit) : 1,
		manualPagination: true,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection,
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			rowSelection,
			columnFilters
		}
	})

	useEffect(() => {
		if (getObjectLength(checkedItems) === 0 && getObjectLength(rowSelection) > 0) {
			setRowSelection(checkedItems)
		}
	}, [checkedItems])

	useEffect(() => {
		const pageIndex = table.getState().pagination.pageIndex + 1

		handleQueryParams('page', pageIndex.toString())
	}, [table.getState().pagination.pageIndex])

	return (
		<>
			<Table>
				<DataTableHeader table={table} />
				<DataTableBody table={table} columns={columns} />
			</Table>
			{pagination && <DataTablePagination table={table} pagination={pagination} />}
		</>
	)
}
