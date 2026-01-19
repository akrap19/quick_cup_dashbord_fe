'use client'

import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'

import { BrandLogo } from '@/components/custom/brand-logo/BrandLogo'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { UserRoleEnum } from 'enums/userRoleEnum'

const HomePage = () => {
	const t = useTranslations()
	const { data: session } = useSession()
	useNavbarItems({ title: 'General.home', useUserDropdown: true })
	const userRole = session?.user?.roles[0]?.name
	let descriptionKey = 'General.welcomeDescription'

	switch (userRole) {
		case UserRoleEnum.ADMIN:
			descriptionKey = 'General.welcomeDescriptionAdmin'
			break
		case UserRoleEnum.SERVICE:
			descriptionKey = 'General.welcomeDescriptionService'
			break
		case UserRoleEnum.CLIENT:
			descriptionKey = 'General.welcomeDescriptionClient'
			break
		default:
			descriptionKey = 'General.welcomeDescription'
			break
	}

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
						{t(descriptionKey)}
					</Text>
				</Stack>
			</Stack>
		</Box>
	)
}

export default HomePage
