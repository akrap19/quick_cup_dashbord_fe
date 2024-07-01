import Image from 'next/image'
import { Box } from '@/components/layout/box'
import * as styles from './MobilePreview.css'
import { Button } from '@/components/inputs/button'
import { LeftArrowIcon } from '@/components/icons/left-arrow-icon'

export const MobilePreview = () => {
	return (
		<Box width="100%" display="flex" justify="center">
			<Image src="/images/mobile.png" width={260} height={518} alt="mobile" />
			<Box className={styles.mobilePreviewContainer}>
				<Box>
					<Image src="/images/mobile-background.png" width={225} height={487} alt="mobile" />
				</Box>
				<Box className={styles.mobilePreviewContentContainer}>
					<Button variant="adaptive">
						<Box className={styles.mobilePreviewBackButtonContainer}>
							<LeftArrowIcon size="xlarge" color="neutral.900" />
						</Box>
					</Button>
				</Box>
			</Box>
		</Box>
	)
}
