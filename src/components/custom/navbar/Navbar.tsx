import { Box } from '@/components/layout/box'
import { Container } from '@/components/layout/container'

import * as styles from './Navbar.css'

export const Navbar = () => {
	return (
		<div className={styles.navbar}>
			<Container>
				<Box>Navbar</Box>
			</Container>
		</div>
	)
}
