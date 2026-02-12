import { Box } from '@/components/layout/box'

import * as styles from './PulseLoader.css'

export const PulseLoader = () => {
	return (
		<Box className={styles.loader}>
			<Box className={styles.loaderAfter} />
		</Box>
	)
}
