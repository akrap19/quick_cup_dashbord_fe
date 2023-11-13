'use client'
import { Box } from '@/components/layout/box'
import { Heading } from '@/components/typography/heading'
import { useNavbarItemsStore } from 'store/NavbarStore'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Text } from '@/components/typography/text'

import * as styles from './Navbar.css'
import { Button } from '@/components/inputs/button'
import { Inline } from '@/components/layout/inline'
import { LeftIcon } from '@/components/icons/left-icon'

export const Navbar = () => {
	const router = useRouter()
	const t = useTranslations()
	const { navbarItems } = useNavbarItemsStore()

	return (
		<Box className={styles.navbar}>
			{navbarItems?.backLabel && (
				<Box top={4} position="absolute">
					<Button onClick={() => router.back()} variant="adaptive" size="small">
						<Inline gap={1} alignItems="center">
							<LeftIcon size="small" />
							<Text fontSize="small" fontWeight="semibold">
								{t('Back.' + navbarItems?.backLabel)}
							</Text>
						</Inline>
					</Button>
				</Box>
			)}
			<Heading variant="h2" textTransform="capitalize" lineHeight="medium" color="neutral.800">
				{t(navbarItems?.title)}
			</Heading>
		</Box>
	)
}
