'use client'

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import { Table } from '@/components/data-display/table/Table'
import { useTable } from '@/hooks/use-table'
import { useTableStore } from '@/store/table'
import { getObjectLength } from '@/utils/getObjectLength'

import { DataTableBody } from './DataTableBody'
import { DataTableHeader } from './DataTableHeader'
import { DataTablePagination } from './DataTablePagination'

interface Props<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export const DataTable = <TData, TValue>({ columns, data }: Props<TData, TValue>) => {
	const { checkedItems } = useTableStore()
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [rowSelection, setRowSelection] = useState({})
	const [sorting, setSorting] = useState<SortingState>([])
	useTable(rowSelection)

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection,
		getPaginationRowModel: getPaginationRowModel(),
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

	return (
		<>
			<Table>
				<DataTableHeader table={table} />
				<DataTableBody table={table} />
			</Table>
			<DataTablePagination table={table} />
		</>
	)
}
