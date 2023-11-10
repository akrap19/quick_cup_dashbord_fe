/* eslint-disable react/no-array-index-key */

'use client'

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable
} from '@tanstack/react-table'
import clsx from 'clsx'
import { useState } from 'react'

import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { atoms } from '@/style/atoms.css'

import * as styles from './DataTable.css'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export const DataTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
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

	const currentPage = table.getState().pagination.pageIndex
	const totalPages = table.getPageCount()

	return (
		<Stack gap={6}>
			<Box overflow="hidden">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
			</Box>
			<Box display="flex" justifyContent="space-between">
				<Button variant="ghost" size="small">
					Export as .xlsl
				</Button>
				<Box display="flex" gap={3} align="center">
					<Text fontSize="small" color="neutral.400">
						Showing all results ({data.length})
					</Text>
					{totalPages > 0 ? (
						<>
							<button
								type="button"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
								className={styles.navButton}>
								Previous
							</button>
							{[...Array(totalPages).keys()].map((_, index) => (
								<button
									key={index}
									type="button"
									className={clsx(
										styles.navButton,
										atoms({ color: currentPage === index ? 'primary.500' : 'neutral.500' })
									)}
									onClick={() => table.setPageIndex(index)}>
									{index + 1}
								</button>
							))}
							<button
								type="button"
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
								className={styles.navButton}>
								Next
							</button>
						</>
					) : null}
				</Box>
			</Box>
		</Stack>
	)
}
