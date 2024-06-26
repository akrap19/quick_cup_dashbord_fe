import { Box } from '@/components/layout/box'
import * as styles from './Loader.css'

export const Loader = () => {
	return (
		<Box display="flex" width="100%" justifyContent="center" paddingY={48}>
			<Box className={styles.loader}>
				<Box className={styles.loaderBefore} />
				<Box className={styles.loaderAfter} />
			</Box>
		</Box>
	)
}
