'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/data-display/table/Table'
import { BlockIcon } from '@/components/icons/block-icon'
import { Checkbox } from '@/components/inputs/checkbox'
import { Box } from '@/components/layout/box'
import { useTranslations } from 'next-intl'
import { dataTableContainer } from './DataTable.css'
import UpDownIcon from '@/components/icons/block-icon/assets/up-down-icon.svg'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { DataTableHeader } from './DataTableHeader'
import { DataTablePagination } from './DataTablePagination'
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export const DataTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
	const t = useTranslations()
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters
		}
	})

	return (
		<>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							<TableHead>{<Checkbox />}</TableHead>
							{headerGroup.headers.map(header => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder ? null : flexRender(t(header.column.columnDef.header), header.getContext())}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map(row => (
							<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
								<TableCell>{<Checkbox />}</TableCell>
								{row.getVisibleCells().map(cell => (
									<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<DataTablePagination table={table} />
		</>
	)
}
