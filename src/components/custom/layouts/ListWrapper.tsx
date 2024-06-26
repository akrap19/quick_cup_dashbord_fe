'use client'

import { ReactNode } from 'react'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { useNavbarItemsStore } from '@/store/navbar'
import { Loader } from '../loader/Loader'
import { useNavbarItems } from '@/hooks/use-navbar-items'

type ListWrapperProps = {
	title: string
	children: ReactNode
}

export const ListWrapper = ({ title, children }: ListWrapperProps) => {
	const { navbarIsLoading } = useNavbarItemsStore()
	useNavbarItems({ title, useUserDropdown: true })

	return (
		<>
			{navbarIsLoading ? (
				<Loader />
			) : (
				<Box width="100%" paddingY={8} paddingRight={20} paddingLeft={10}>
					<Stack gap={7}>{children}</Stack>
				</Box>
			)}
		</>
	)
}
