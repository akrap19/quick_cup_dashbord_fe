'use client'
import { Box } from '@/components/layout/box'
import { ReactNode } from 'react'
import { Stack } from '@/components/layout/stack'

type ListWrapperProps = {
	children: ReactNode
}

export const ListWrapper = ({ children }: ListWrapperProps) => {
	return (
		<Box width="100%" paddingY={8} paddingRight={20} paddingLeft={10}>
			<Stack gap={7}>{children}</Stack>
		</Box>
	)
}
