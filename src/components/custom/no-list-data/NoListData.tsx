'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { MouseEventHandler } from 'react'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useNavbarItemsStore } from '@/store/navbar'

import { AddButton } from '../button/add-button'
import { Loader } from '../loader/Loader'

type Props = {
	navbarTitle?: string
	title: string
	description: string
	buttonLabel: string
	buttonLink?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
	distanceFromTop?: string
	setNavbarItems?: boolean
}

export const NoListData = ({
	navbarTitle,
	title,
	description,
	buttonLabel,
	buttonLink,
	onClick,
	distanceFromTop,
	setNavbarItems = true
}: Props) => {
	const t = useTranslations()
	const { navbarIsLoading } = useNavbarItemsStore()
	const { push } = useRouter()
	const onClickMethod = !buttonLink ? onClick : () => push(buttonLink)

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
							<Box>
								<AddButton buttonLabel={t(buttonLabel)} onClick={onClickMethod} />
							</Box>
						</Stack>
					</Box>
				</Box>
			)}
		</Box>
	)
}
