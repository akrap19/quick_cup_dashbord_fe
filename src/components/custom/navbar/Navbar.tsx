'use client'
import { Box } from '@/components/layout/box'
import { Heading } from '@/components/typography/heading'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Text } from '@/components/typography/text'

import * as styles from './Navbar.css'
import { Button } from '@/components/inputs/button'
import { Inline } from '@/components/layout/inline'
import { LeftIcon } from '@/components/icons/left-icon'
import { useNavbarItemsStore } from 'store/navbar'

export const Navbar = () => {
	const router = useRouter()
	const t = useTranslations()
	const { navbarItems } = useNavbarItemsStore()

	return (
		<Box className={styles.navbar}>
			{navbarItems?.backLabel && (
				<Box style={{ top: '1rem' }} position="absolute">
					<Button onClick={() => router.back()} variant="adaptive" size="small">
						<Inline gap={1} alignItems="center">
							<LeftIcon size="small" />
							<Text lineHeight="small" fontSize="small" fontWeight="semibold">
								{t('Back.' + navbarItems?.backLabel)}
							</Text>
						</Inline>
					</Button>
				</Box>
			)}
			<Box width="100%">
				<Inline justifyContent="space-between" alignItems="flex-start">
					<Heading variant="h2" textTransform="capitalize" lineHeight="medium" color="neutral.800">
						{t(navbarItems?.title ?? 'General.loading')}
					</Heading>
					{navbarItems?.actionButton && <Box style={{ marginTop: '-1rem' }}>{navbarItems?.actionButton}</Box>}
				</Inline>
			</Box>
		</Box>
	)
}
