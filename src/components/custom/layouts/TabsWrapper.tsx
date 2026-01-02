'use client'

import { useTranslations } from 'next-intl'
import { ReactNode, useEffect } from 'react'

import { Box } from '@/components/layout/box'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItemsStore } from '@/store/navbar'
import { tokens } from '@/style/theme.css'

import { Loader } from '../loader/Loader'

export const TabsWrapper = ({ children }: { children: ReactNode }) => {
	const t = useTranslations()
	const { navbarIsLoading } = useNavbarItemsStore()

	useEffect(() => {
		const editMessage = localStorage.getItem('editMessage')

		if (editMessage) {
			SuccessToast(t(editMessage))
			localStorage.removeItem('editMessage')
		}
	}, [])

	return (
		<Box width="100%" paddingTop={6}>
			{navbarIsLoading ? (
				<Loader />
			) : (
				<Box
					padding={6}
					backgroundColor="neutral.50"
					border="thin"
					borderColor="neutral.300"
					style={{ height: 'calc(100vh - 336px)' }}>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',
							columnGap: tokens.spacing[6],
							rowGap: tokens.spacing[8]
						}}>
						{children}
					</div>
				</Box>
			)}
		</Box>
	)
}
