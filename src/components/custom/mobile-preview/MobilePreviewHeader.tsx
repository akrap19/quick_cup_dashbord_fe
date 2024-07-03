import { LeftArrowIcon } from '@/components/icons/left-arrow-icon'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import * as styles from './MobilePreview.css'

export const MobilePreviewHeader = () => {
	return (
		<Button variant="adaptive">
			<Box className={styles.mobilePreviewBackButtonWrapper}>
				<LeftArrowIcon size="xlarge" color="neutral.900" />
			</Box>
		</Button>
	)
}
