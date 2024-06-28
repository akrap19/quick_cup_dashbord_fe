'use client'

import { ReactNode, useEffect } from 'react'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { useNavbarItemsStore } from '@/store/navbar'
import { Loader } from '../loader/Loader'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useTranslations } from 'next-intl'

type ListWrapperProps = {
	title: string
	children: ReactNode
}

export const ListWrapper = ({ title, children }: ListWrapperProps) => {
	const t = useTranslations()
	const { navbarIsLoading } = useNavbarItemsStore()
	useNavbarItems({ title, useUserDropdown: true })

	useEffect(() => {
		const editMessage = localStorage.getItem('editMessage')

		if (editMessage) {
			SuccessToast(t(editMessage))
			localStorage.removeItem('editMessage')
		}
	}, [])

	return (
		<>
			{navbarIsLoading ? (
				<Loader />
			) : (
				<Box width="100%" paddingY={8} paddingRight={16} paddingLeft={10}>
					<Stack gap={7}>{children}</Stack>
				</Box>
			)}
		</>
	)
}
