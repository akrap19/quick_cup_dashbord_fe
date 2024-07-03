import Image from 'next/image'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'

import * as styles from './MobilePreview.css'
import { MobilePreviewContent } from './MobilePreviewContent'
import { MobilePreviewFooter } from './MobilePreviewFooter'
import { MobilePreviewHeader } from './MobilePreviewHeader'

export const MobilePreview = () => {
	return (
		<Box width="100%" display="flex" justify="center">
			<Image src="/images/mobile.png" width={260} height={518} alt="mobile" />
			<Box className={styles.mobilePreview}>
				<Box>
					<Image src="/images/mobile-background.png" width={225} height={487} alt="mobile" />
				</Box>
				<Box className={styles.mobilePreviewContainer}>
					<Stack gap={10}>
						<MobilePreviewHeader />
						<MobilePreviewContent />
						<MobilePreviewFooter />
					</Stack>
				</Box>
			</Box>
		</Box>
	)
}
