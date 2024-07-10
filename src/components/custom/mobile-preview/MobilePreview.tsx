import Image from 'next/image'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'

import * as styles from './MobilePreview.css'
import { MobilePreviewContent } from './MobilePreviewContent'
import { MobilePreviewFooter } from './MobilePreviewFooter'
import { MobilePreviewHeader } from './MobilePreviewHeader'
import { useState } from 'react'

const contentTypes = ['About Barnahus', 'Rooms', 'Staff']

export const MobilePreview = () => {
	const [contentType, setContentType] = useState('About Barnahus')

	return (
		<Box width="100%" display="flex" justify="center">
			<Image src="/images/mobile.png" width={260} height={518} alt="mobile" />
			<Box className={styles.mobilePreview}>
				<Box>
					<Image src="/images/mobile-background.png" width={225} height={487} alt="mobile-background" />
				</Box>
				<Box className={styles.mobilePreviewContainer}>
					<Stack gap={10}>
						<MobilePreviewHeader
							contentTypes={contentTypes}
							contentType={contentType}
							setContentType={setContentType}
						/>
						<Stack gap={6}>
							<MobilePreviewContent />
							<MobilePreviewFooter />
						</Stack>
					</Stack>
				</Box>
			</Box>
		</Box>
	)
}
