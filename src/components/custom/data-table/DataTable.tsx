'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/data-display/table/Table'
import { BlockIcon } from '@/components/icons/block-icon'
import { Checkbox } from '@/components/inputs/checkbox'
import { Box } from '@/components/layout/box'
import { useTranslations } from 'next-intl'
import { dataTableContainer, dataTablePaginationContainer } from './DataTable.css'
import UpDownIcon from '@/components/icons/block-icon/assets/up-down-icon.svg'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { SearchInput } from '../search-input/SearchInput'
import { AddButton } from '../add-button/AddButton'
import { Text } from '@/components/typography/text'
import { Button } from '@/components/inputs/button'

type Columns = {
	field: string
	label: string
	hasSort: boolean
}

type DataTableProps = {
	label: string
	buttonLink: string
	columns: Columns[]
	data: any[]
}

export const DataTable = ({ label, buttonLink, columns, data }: DataTableProps) => {
	const t = useTranslations()

	return (
		<Box className={dataTableContainer}>
			<Stack gap={7}>
				<Inline justifyContent="space-between" alignItems="center">
					<Box style={{ width: '320px' }}>
						<SearchInput placeholder={t('General.search' + label)} />
					</Box>
					<AddButton buttonLabel={t('General.add' + label)} buttonLink={buttonLink} />
				</Inline>
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
			<Box className={dataTablePaginationContainer}>
				<Inline gap={4} alignItems="center">
					<Text fontSize="small">{'Showing all results (10)'}</Text>
					<Button variant="adaptive">
						<Text color="neutral.200">{'Previous'}</Text>
					</Button>
					<Inline gap={2} alignItems="center">
						<Text color="primary.500">{'1'}</Text>
						<Button variant="adaptive">
							<Text color="neutral.400">{'2'}</Text>
						</Button>
						<Button variant="adaptive">
							<Text color="neutral.400">{'3'}</Text>
						</Button>
					</Inline>
					<Button variant="adaptive">
						<Text color="neutral.200">{'Next'}</Text>
					</Button>
				</Inline>
			</Box>
		</Box>
	)
}
