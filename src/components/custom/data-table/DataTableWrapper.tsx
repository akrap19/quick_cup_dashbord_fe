'use client'
import { Box } from '@/components/layout/box'
import { ReactNode } from 'react'
import { dataTableContainer } from './DataTable.css'
import { Stack } from '@/components/layout/stack'

type DataTablePaginationProps = {
	children: ReactNode
}

export const DataTableWrapper = ({ children }: DataTablePaginationProps) => {
	return (
		<Box className={dataTableContainer}>
			<Stack gap={7}>{children}</Stack>
		</Box>
	)
}
