'use client'

import { Table, flexRender } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'

import { Checkbox } from '@/components/inputs/checkbox'

import { TableHead, TableHeader, TableRow } from '../table'

// eslint-disable-next-line
interface Props<TData, TValue> {
	table: Table<TData>
}

export const DataTableHeader = <TData, TValue>({ table }: Props<TData, TValue>) => {
	const t = useTranslations()

	return (
		<TableHeader>
			{table.getHeaderGroups().map(headerGroup => (
				<TableRow key={headerGroup.id}>
					<TableHead>
						<Checkbox
							checked={table?.getIsAllRowsSelected()}
							indeterminate={table.getIsSomeRowsSelected()}
							onChange={table.getToggleAllRowsSelectedHandler()}
						/>
					</TableHead>
					{headerGroup.headers.map(header => {
						return (
							<TableHead key={header.id}>
								{/* For sort uncomment lines */}
								{/* <Inline justifyContent="space-between"> */}
								{header.isPlaceholder ? null : flexRender(t(header.column.columnDef.header), header.getContext())}
								{/* <Button variant="adaptive" size="auto" onClick={header.column.getToggleSortingHandler()}>
										{{
											false: <ChevronSelectorIcon />,
											asc: <ChevronSelectorUpIcon />,
											desc: <ChevronSelectorDownIcon />
										}[header.column.getIsSorted() as string] ?? null}
									</Button> */}
								{/* </Inline> */}
							</TableHead>
						)
					})}
				</TableRow>
			))}
		</TableHeader>
	)
}
