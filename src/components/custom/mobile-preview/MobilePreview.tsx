import Image from 'next/image'
import { Box } from '@/components/layout/box'
import * as styles from './MobilePreview.css'

export const MobilePreview = () => {
	return (
		<Box width="100%" display="flex" justify="center">
			<Image src="/images/mobile.png" width={260} height={518} alt="mobile" />
			<Box className={styles.mobilePreviewContainer}>
				<Image src="/images/mobile-background.png" width={225} height={487} alt="mobile" />
			</Box>
		</Box>
	)
}
