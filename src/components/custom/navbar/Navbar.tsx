import { Box } from '@/components/layout/box'
import { Heading } from '@/components/typography/heading'

import * as styles from './Navbar.css'

export const Navbar = () => {
	return (
		<Box className={styles.navbar}>
			<Heading variant="h3">{'Barnahuses'}</Heading>
			<Heading variant="h3">{'Barnahuses'}</Heading>
		</Box>
	)
}
