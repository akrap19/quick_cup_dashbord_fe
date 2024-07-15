'use client'

import { useTranslations } from 'next-intl'
import { ReactNode, useEffect } from 'react'

import { Box } from '@/components/layout/box'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { tokens } from '@/style/theme.css'
import { useNavbarItemsStore } from '@/store/navbar'

import { Loader } from '../loader/Loader'

interface Props {
	children: ReactNode
}

export const DetailsWrapper = ({ children }: Props) => {
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
		<>
			{navbarIsLoading ? (
				<Loader />
			) : (
				<Box paddingX={10} paddingTop={10} paddingBottom={8} width="100%">
					<Box
						padding={6}
						style={{ maxWidth: '60rem' }}
						backgroundColor="neutral.50"
						border="thin"
						borderColor="neutral.300">
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
				</Box>
			)}
		</>
	)
}
