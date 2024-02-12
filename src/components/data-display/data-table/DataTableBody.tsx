'use client'

import { Cell, Table, flexRender } from '@tanstack/react-table'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Checkbox } from '@/components/inputs/checkbox'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { columns } from 'app/[locale]/(index)/admins/columns'

import { TableBody, TableCell, TableCellWithLink, TableRow } from '../table'

// eslint-disable-next-line
interface Props<TData, TValue> {
	table: Table<TData>
}

export const DataTableBody = <TData, TValue>({ table }: Props<TData, TValue>) => {
	const t = useTranslations()
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
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCellWithLink>
						))}
					</TableRow>
				))
			) : (
				<TableRow>
					<TableCell colSpan={columns.length + 1} className="h-24 text-center">
						<Box backgroundColor="shades.00" width="100%" display="flex" justifyContent="center" paddingY={6}>
							<Stack gap={1}>
								<Image src="/images/no-data-found.svg" alt="noDataFound" width={264} height={180} />
								<Box display="flex" justify="center">
									<Text fontStyle="italic" lineHeight="xlarge" color="neutral.700">
										{t('General.noResoultMessage')}
									</Text>
								</Box>
							</Stack>
						</Box>
					</TableCell>
				</TableRow>
			)}
		</TableBody>
	)
}
