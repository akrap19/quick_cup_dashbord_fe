'use client'

import { useTranslations } from 'next-intl'
import React, { InputHTMLAttributes, useEffect, useState } from 'react'

import { PauseIcon } from '@/components/icons/pause-icon'
import { PlayIcon } from '@/components/icons/play-icon'
import { Button } from '@/components/inputs/button'
import { Inline } from '@/components/layout/inline'
import { Audio } from 'api/models/common/audio'
import { deleteMedia, media } from 'api/services/common'

import * as styles from './AudioUpload.css'
import { IconDeleteButton } from '../../button/icon-delete-button/IconDeleteButton'
import { iconContainer } from '../../button/icon-delete-button/IconDeleteButton.css'

type Props = InputHTMLAttributes<HTMLInputElement> & {
	initialAudio?: Audio
}

export const AudioUpload = ({ initialAudio, ...rest }: Props) => {
	const [isAudioPlaying, setIsAudioPlaying] = useState(false)
	const [audioFile, setAudioFile] = useState<File>()
	const [audioElement, setAudioElement] = useState<HTMLAudioElement>()
	const t = useTranslations()

	const handleFileChange = async (event: any) => {
		const file = event.target.files[0]
		const audio = new window.Audio(URL.createObjectURL(file))
		audio.loop = true
		const result = await media('Audio', file)

		if (result?.message === 'OK') {
			handleInputValue(result.data.mediaId)
			setAudioFile(file)
			setAudioElement(audio)
		}
	}

	const handleDelete = async () => {
		if (isAudioPlaying) {
			audioElement?.pause()
			setIsAudioPlaying(!isAudioPlaying)
		}

		if (rest && rest.value) {
			if (rest.value.toString() !== initialAudio?.id) {
				const result = await deleteMedia(rest.value.toString())

				if (result?.message === 'OK') {
					handleRemovingAudio()
				}
			} else if (rest.value.toString() === initialAudio?.id) {
				handleRemovingAudio()
			}
		}
	}

	const handleRemovingAudio = () => {
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

	useEffect(() => {
		if (initialAudio?.url) {
			const audio = new window.Audio(initialAudio?.url)
			audio.loop = true
			setAudioElement(audio)
		}
	}, [])

	return (
		<div>
			{audioFile || initialAudio ? (
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
									{audioFile?.name ?? initialAudio?.name}
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
