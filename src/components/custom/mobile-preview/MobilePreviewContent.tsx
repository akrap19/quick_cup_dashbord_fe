import { AudioIcon } from '@/components/icons/audio-icon'
import { PauseIcon } from '@/components/icons/pause-icon'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { tokens } from '@/style/theme.css'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import * as styles from './MobilePreview.css'

interface Props {
	content: any
	currentImage: number
	setCurrentImage: Dispatch<SetStateAction<number>>
}

export const MobilePreviewContent = ({ content, currentImage, setCurrentImage }: Props) => {
	const [isAudioPlaying, setIsAudioPlaying] = useState(false)
	const [audioElement, setAudioElement] = useState<HTMLAudioElement>()
	const contentImages =
		(content?.aboutImages && content?.aboutImages) ??
		(content?.roomImages && content?.roomImages) ??
		(content?.staffImages && content?.staffImages)

	const playAudioFile = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()
		if (isAudioPlaying) {
			audioElement?.pause()
		} else {
			audioElement?.play()
		}
		setIsAudioPlaying(!isAudioPlaying)
	}

	useEffect(() => {
		if (isAudioPlaying) {
			audioElement?.pause()
			setIsAudioPlaying(false)
		}
		if (content?.audioURL) {
			const audio = new window.Audio(content?.audioURL)
			audio.loop = true
			setAudioElement(audio)
		}
	}, [content])

	console.log('content?.description', content?.description)
	return (
		<Box className={styles.mobilePreviewContentContainer}>
			<Stack gap={3}>
				<Inline justifyContent="space-between" alignItems="flex-start">
					<Box style={{ width: '268px' }}>
						<Text fontSize="xxbig" fontWeight="bold" lineHeight="medium" color="neutral.900">
							{content?.title}
						</Text>
					</Box>
					{content?.audioURL && (
						<Button size="auto" variant="adaptive" onClick={playAudioFile}>
							{isAudioPlaying ? (
								<PauseIcon size="xlarge" color="neutral.900" />
							) : (
								<AudioIcon size="xlarge" color="neutral.900" />
							)}
						</Button>
					)}
				</Inline>
				<Box borderRadius="small">
					<img
						alt="mobile-preview"
						src={contentImages[currentImage]?.url}
						style={{ objectFit: 'contain', maxWidth: '302px' }}
					/>
				</Box>
				<Stack gap={6}>
					<Inline justifyContent="space-around">
						<Inline gap={4}>
							{contentImages?.map((_: any, index: number) => (
								<Button
									size="auto"
									variant="adaptive"
									disabled={index === currentImage}
									onClick={() => setCurrentImage(index)}>
									<Box backgroundColor="primary.500" borderRadius="full" style={{ height: '12px', width: '12px' }} />
								</Button>
							))}
						</Inline>
					</Inline>
					<div
						dangerouslySetInnerHTML={{ __html: content?.description }}
						style={{ lineHeight: tokens.typography.lineHeight.xlarge, color: tokens.colors['neutral.900'] }}
					/>
				</Stack>
			</Stack>
		</Box>
	)
}
