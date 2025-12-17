'use client'

import { useTranslations } from 'next-intl'
import { PropsWithChildren } from 'react'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useNavbarItemsStore } from '@/store/navbar'

import { Loader } from '../loader/Loader'

type Props = {
	navbarTitle?: string
	title: string
	description: string
	distanceFromTop?: string
	setNavbarItems?: boolean
} & PropsWithChildren

export const NoListDataLayout = ({
	navbarTitle,
	title,
	description,
	distanceFromTop,
	setNavbarItems = true,
	children
}: Props) => {
	const t = useTranslations()
	const { navbarIsLoading } = useNavbarItemsStore()

	if (setNavbarItems) {
		// eslint-disable-next-line
		useNavbarItems({ title: navbarTitle ?? '', useUserDropdown: true })
	}

	return (
		<Box width="100%">
			{navbarIsLoading ? (
				<Loader />
			) : (
				<Box display="flex" align="center" justify="center" width="100%">
					<Box textAlign="center" color="neutral.900" style={{ width: '500px', marginTop: distanceFromTop ?? '20vh' }}>
						<Stack gap={6}>
							<Stack gap={4}>
								<Heading variant="h2" lineHeight="medium">
									{t(title)}
								</Heading>
								<Text lineHeight="xlarge">{t(description)}</Text>
							</Stack>
							{children}
						</Stack>
					</Box>
				</Box>
			)}
		</Box>
	)
}
