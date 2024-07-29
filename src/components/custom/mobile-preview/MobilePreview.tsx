import Image from 'next/image'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'

import * as styles from './MobilePreview.css'
import { MobilePreviewContent } from './MobilePreviewContent'
import { MobilePreviewFooter } from './MobilePreviewFooter'
import { MobilePreviewHeader } from './MobilePreviewHeader'
import { useState } from 'react'
import { Content } from 'api/models/content/content'

const contentTypes = ['abouts', 'rooms', 'staff']

interface Props {
	content: Content
}

export const MobilePreview = ({ content }: Props) => {
	const [contentType, setContentType] = useState('abouts')
	const [currentContentPage, setCurrentContentPage] = useState(0)
	const currentContent = content[contentType as keyof Content][currentContentPage]

	return (
		<Box width="100%" display="flex" justify="center">
			<Image src="/images/mobile.png" width={260} height={518} alt="mobile" />
			<Box className={styles.mobilePreview}>
				<Box>
					<Image src="/images/mobile-background.png" width={225} height={487} alt="mobile-background" />
				</Box>
				<Box className={styles.mobilePreviewContainer}>
					<Stack gap={8}>
						<MobilePreviewHeader
							contentTypes={contentTypes}
							contentType={contentType}
							setContentType={setContentType}
						/>
						<Stack gap={6}>
							<MobilePreviewContent content={currentContent} />
							<MobilePreviewFooter />
						</Stack>
					</Stack>
				</Box>
			</Box>
		</Box>
	)
}
