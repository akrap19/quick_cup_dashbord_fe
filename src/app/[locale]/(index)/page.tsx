'use client'

import { useTranslations } from 'next-intl'

import { BrandLogo } from '@/components/custom/brand-logo/BrandLogo'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'

const HomePage = () => {
	const t = useTranslations()
	useNavbarItems({ title: 'General.home', useUserDropdown: true })

	return (
		<Box
			width="100%"
			display="flex"
			justify="center"
			alignItems="center"
			paddingY={8}
			paddingX={10}
			style={{ minHeight: 'calc(100vh - 400px)' }}>
			<Stack gap={8} alignItems="center" style={{ maxWidth: '700px', textAlign: 'center' }}>
				<BrandLogo height={120} />
				<Stack gap={4} alignItems="center">
					<Heading variant="h2" textAlign="center">
						{t('General.welcomeTitle')}
					</Heading>
					<Text fontSize="medium" textAlign="center" color="neutral.600" lineHeight="xlarge">
						{t('General.welcomeDescription')}
					</Text>
				</Stack>
			</Stack>
		</Box>
	)
}

export default HomePage
