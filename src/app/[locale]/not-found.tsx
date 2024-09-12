'use client'

import { redirect, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import { BrandLogo } from '@/components/custom/brand-logo/BrandLogo'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'
import { atoms } from '@/style/atoms.css'
import { ROUTES } from 'parameters'

const NotFound = () => {
	const t = useTranslations()
	const { push } = useRouter()
	const { data: session } = useSession()

	if (session === null) {
		redirect(ROUTES.LOGIN)
	}

	return (
		<Box width="100vw" justify="center" style={{ paddingTop: '18%', display: session ? 'flex' : 'none' }}>
			<Stack gap={10} alignItems="center">
				<BrandLogo />
				<Box
					backgroundColor="neutral.50"
					boxShadow="medium"
					padding={10}
					borderRadius="small"
					style={{ width: '500px' }}>
					<Stack gap={8} alignItems="center">
						<Stack gap={3}>
							<Heading variant="h3" textTransform="uppercase" textAlign="center" whiteSpace="nowrap">
								{t('General.pageNotFound')}
							</Heading>
							<Text fontSize="small" textAlign="center">
								{t('General.pageNotFoundDescription')}
							</Text>
						</Stack>
						<Button className={atoms({ width: '100%' })} onClick={() => push(ROUTES.HOME)}>
							{t('General.goToDashboard')}
						</Button>
					</Stack>
				</Box>
			</Stack>
		</Box>
	)
}

export default NotFound
