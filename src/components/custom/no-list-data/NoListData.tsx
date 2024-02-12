'use client'

import { useTranslations } from 'next-intl'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'

import { AddButton } from '../button/add-button'

type Props = { navbarTitle: string; title: string; description: string; buttonLabel: string; buttonLink: string }

export const NoListData = ({ navbarTitle, title, description, buttonLabel, buttonLink }: Props) => {
	const t = useTranslations()
	useNavbarItems({ title: navbarTitle, useUserDropdown: true })

	return (
		<Box display="flex" align="center" justify="center" width="100%">
			<Box textAlign="center" color="neutral.900" style={{ width: '500px', marginTop: '20vh' }}>
				<Stack gap={6}>
					<Stack gap={4}>
						<Heading variant="h2" lineHeight="medium">
							{t(title)}
						</Heading>
						<Text lineHeight="xlarge">{t(description)}</Text>
					</Stack>
					<Box>
						<AddButton buttonLabel={t(buttonLabel)} buttonLink={buttonLink} />
					</Box>
				</Stack>
			</Box>
		</Box>
	)
}
