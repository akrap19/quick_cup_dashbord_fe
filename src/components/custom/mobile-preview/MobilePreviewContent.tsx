import { AudioIcon } from '@/components/icons/audio-icon'
import { PauseIcon } from '@/components/icons/pause-icon'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { About } from 'api/models/content/about'
import { Room } from 'api/models/content/room'
import { Staff } from 'api/models/content/staff'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import * as styles from './MobilePreview.css'

interface Props {
	content: any
}

export const MobilePreviewContent = ({ content }: Props) => {
	const [isAudioPlaying, setIsAudioPlaying] = useState(false)
	const [audioElement, setAudioElement] = useState<HTMLAudioElement>()

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

	return (
		<Box className={styles.mobilePreviewContentContainer}>
			<Stack gap={3}>
				<Inline justifyContent="space-between" alignItems="center">
					<Text fontSize="xxbig" fontWeight="bold" lineHeight="medium" color="neutral.900">
						{content?.title}
					</Text>
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
					<Image alt="mobile-preview" src="/images/mobile-preview-template.png" height={234} width={302} />
				</Box>
				<Stack gap={6}>
					<Inline justifyContent="space-around" gap={4}>
						<Box backgroundColor="primary.500" borderRadius="full" style={{ height: '12px', width: '12px' }} />
					</Inline>
					<Text lineHeight="xlarge">{content?.description}</Text>
				</Stack>
			</Stack>
		</Box>
	)
}
