'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/data-display/table/Table'
import { BlockIcon } from '@/components/icons/block-icon'
import { Checkbox } from '@/components/inputs/checkbox'
import { useTranslations } from 'next-intl'
import UpDownIcon from '@/components/icons/block-icon/assets/up-down-icon.svg'
import { Inline } from '@/components/layout/inline'

type Columns = {
	field: string
	label: string
	hasSort?: boolean
}

type DataTableProps = {
	columns: Columns[]
	data: any[]
}

export const DataTable = ({ columns, data }: DataTableProps) => {
	const t = useTranslations()

	return (
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
	)
}
