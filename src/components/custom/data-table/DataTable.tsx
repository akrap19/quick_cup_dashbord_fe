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

type Columns = {
	field: string
	label: string
	hasSort?: boolean
}

type DataTableProps = {
	buttonLabel: string
	buttonLink: string
	columns: Columns[]
	data: any[]
	description?: string
	selectOptions?: any[]
	searchPlaceholder?: string
}

export const DataTable = ({
	buttonLink,
	columns,
	data,
	buttonLabel,
	description,
	selectOptions,
	searchPlaceholder
}: DataTableProps) => {
	const t = useTranslations()

	return (
		<Box className={dataTableContainer}>
			<Stack gap={7}>
				<DataTableHeader
					buttonLink={buttonLink}
					buttonLabel={buttonLabel}
					description={description}
					selectOptions={selectOptions}
					searchPlaceholder={searchPlaceholder}
				/>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>{<Checkbox />}</TableHead>
							{columns.map((c: Columns) => (
								<TableHead>
									<Inline justifyContent="space-between">
										{t(c.label)}
										{c.hasSort && <BlockIcon icon={UpDownIcon} color="primary.500"></BlockIcon>}
									</Inline>
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((d: any) => (
							<TableRow>
								<TableCell>{<Checkbox />}</TableCell>
								{columns.map((c: Columns) => (
									<TableCell>{d[c.field]}</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Stack>
			<DataTablePagination />
		</Box>
	)
}
