'use client'
import { Button } from '@/components/inputs/button'
import { Text } from '@/components/typography/text'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { dataTablePaginationContainer } from './DataTable.css'

type DataTablePaginationProps = {}

export const DataTablePagination = ({}: DataTablePaginationProps) => {
	return (
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
	)
}
