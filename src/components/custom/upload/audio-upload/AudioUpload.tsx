import { useTranslations } from 'next-intl'
import React, { InputHTMLAttributes, useState } from 'react'

import { PauseIcon } from '@/components/icons/pause-icon'
import { PlayIcon } from '@/components/icons/play-icon'
import { Button } from '@/components/inputs/button'
import { Inline } from '@/components/layout/inline'

import * as styles from './AudioUpload.css'
import { IconDeleteButton } from '../../button/icon-delete-button/IconDeleteButton'
import { iconContainer } from '../../button/icon-delete-button/IconDeleteButton.css'

type Props = InputHTMLAttributes<HTMLInputElement>

export const AudioUpload = ({ ...rest }: Props) => {
	const [isAudioPlaying, setIsAudioPlaying] = useState(false)
	const [audioFile, setAudioFile] = useState<File>()
	const [audioElement, setAudioElement] = useState<HTMLAudioElement>()
	const t = useTranslations()

	const handleFileChange = (event: any) => {
		const file = event.target.files[0]
		const audio = new Audio(URL.createObjectURL(file))
		audio.loop = true
		handleInputValue(event)
		setAudioFile(file)
		setAudioElement(audio)
	}

	const handleDelete = () => {
		if (isAudioPlaying) {
			audioElement?.pause()
			setIsAudioPlaying(!isAudioPlaying)
		}
		handleInputValue(undefined)
		setAudioFile(undefined)
		setAudioElement(undefined)
	}

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

	const handleInputValue = (value: any) => {
		if (rest.onChange) {
			rest.onChange(value)
		}
	}

	return (
		<div>
			{audioFile ? (
				<div className={styles.fileContainer}>
					<Inline justifyContent="space-between">
						<Inline alignItems="center" gap={4}>
							<Button size="auto" variant="adaptive" onClick={playAudioFile}>
								<div className={iconContainer({ variant: 'audio' })}>
									{isAudioPlaying ? (
										<PauseIcon size="large" color="neutral.800" />
									) : (
										<PlayIcon size="large" color="neutral.800" />
									)}
								</div>
							</Button>
							<div className={styles.fileLabelConteiner}>
								<label htmlFor={rest.id} className={styles.fileLabel}>
									{audioFile.name}
								</label>
							</div>
						</Inline>
						<IconDeleteButton onDelete={handleDelete} />
					</Inline>
				</div>
			) : (
				<>
					<input
						{...rest}
						type="file"
						accept="audio/*"
						multiple={false}
						value={audioFile}
						onChange={handleFileChange}
						className={styles.fileInput}
					/>
					<label htmlFor={rest.id} className={styles.audioUploadLabel}>
						{t('General.uploadAudio')}
					</label>
				</>
			)}
		</div>
	)
}
