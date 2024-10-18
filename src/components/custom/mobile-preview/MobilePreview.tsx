import Image from 'next/image'
import { useState } from 'react'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Content } from 'api/models/content/content'

import * as styles from './MobilePreview.css'
import { MobilePreviewContent } from './MobilePreviewContent'
import { MobilePreviewFooter } from './MobilePreviewFooter'
import { MobilePreviewHeader } from './MobilePreviewHeader'

const contentTypes = ['abouts', 'rooms', 'staff']

interface Props {
	content: Content
}

export const MobilePreview = ({ content }: Props) => {
	const [contentType, setContentType] = useState('abouts')
	const [currentImage, setCurrentImage] = useState(0)
	const [currentContentPage, setCurrentContentPage] = useState(0)
	const currentContent = content && content[contentType as keyof Content][currentContentPage]

	const handleContentType = (contentType: string) => {
		setCurrentImage(0)
		setCurrentContentPage(0)
		setContentType(contentType)
	}

	const handleContentPage = (contentPage: number) => {
		setCurrentImage(0)
		setCurrentContentPage(contentPage)
	}

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
							handleContentType={handleContentType}
						/>
						<Stack gap={6}>
							<MobilePreviewContent
								content={currentContent}
								currentImage={currentImage}
								setCurrentImage={setCurrentImage}
							/>
							<MobilePreviewFooter
								totalContentPages={content ? content[contentType as keyof Content]?.length : 0}
								currentContentPage={currentContentPage}
								handleContentPage={handleContentPage}
							/>
						</Stack>
					</Stack>
				</Box>
			</Box>
		</Box>
	)
}
