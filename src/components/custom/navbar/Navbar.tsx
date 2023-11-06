'use client'
import { Box } from '@/components/layout/box'
import { Heading } from '@/components/typography/heading'
import { usePathname } from 'next/navigation'

import * as styles from './Navbar.css'

export const Navbar = () => {
	const pathname = usePathname()
	const slicedPathname = pathname.slice(1)

	return (
		<Box className={styles.navbar}>
			<Heading variant="h2" textTransform="capitalize" lineHeight="medium" color="neutral.800">
				{slicedPathname}
			</Heading>
		</Box>
	)
}
