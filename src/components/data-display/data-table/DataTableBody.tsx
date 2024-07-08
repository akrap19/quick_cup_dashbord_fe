'use client'

import { Cell, ColumnDef, Table, flexRender } from '@tanstack/react-table'
import { usePathname } from 'next/navigation'

import { NoResult } from '@/components/custom/no-result/NoResult'
import { Checkbox } from '@/components/inputs/checkbox'

import { TableBody, TableCell, TableCellWithLink, TableRow } from '../table'
import { Badge } from '@/components/custom/badge'
import { Box } from '@/components/layout/box'

interface Props<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	table: Table<TData>
}

export const DataTableBody = <TData, TValue>({ columns, table }: Props<TData, TValue>) => {
	const pathname = usePathname()

	return (
		<TableBody>
			{table.getRowModel().rows?.length ? (
				table.getRowModel().rows.map((row: any) => (
					<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
						<TableCell>
							<Checkbox
								checked={row.getIsSelected()}
								indeterminate={row.getIsSomeSelected()}
								onChange={row.getToggleSelectedHandler()}
							/>
						</TableCell>
						{row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
							<TableCellWithLink key={cell.id} href={`${pathname}/${row.original?.id}`}>
								{cell.column.id.includes('status') ? (
									<Box position="relative">
										<Badge variant={cell.getValue() as any} />
									</Box>
								) : (
									flexRender(cell.column.columnDef.cell, cell.getContext())
								)}
							</TableCellWithLink>
						))}
					</TableRow>
				))
			) : (
				<TableRow>
					<TableCell colSpan={columns.length + 1} className="h-24 text-center">
						<NoResult size="large" noResoultMessage="General.noResoultMessage" />
					</TableCell>
				</TableRow>
			)}
		</TableBody>
	)
}
