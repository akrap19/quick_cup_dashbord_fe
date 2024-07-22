'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import React, { InputHTMLAttributes, useEffect, useState } from 'react'

import { UploadIcon } from '@/components/icons/upload-icon'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { deleteMedia, media } from 'api/services/common'

import * as styles from './PhotoUpload.css'
import { IconDeleteButton } from '../../button/icon-delete-button/IconDeleteButton'

type Props = InputHTMLAttributes<HTMLInputElement> & {
	initialImagesUrls?: string[]
}

export const PhotoUpload = ({ initialImagesUrls, ...rest }: Props) => {
	const t = useTranslations()
	const [photos, setPhotos] = useState<string[]>([])
	const [mediaId, setMediaId] = useState<string[]>([])

	const handleFileChange = (event: any) => {
		const { files } = event.target

		const newPhotosForUpload: string[] = [...photos]
		const newUploadedMediaId: string[] = [...mediaId]

		const handleAllFileUploads = async () => {
			for (const file of files) {
				const result = await handleFileUpload(file)
				if (result) {
					newPhotosForUpload.push(result.urlObject)
					newUploadedMediaId.push(result.mediaId)
				}
			}

			setPhotos(newPhotosForUpload)
			setMediaId(newUploadedMediaId)
			handleInputValue(newUploadedMediaId)
		}

		handleAllFileUploads()
	}

	const handleFileUpload = async (file: File) => {
		const result = await media('Image', file)

		if (result?.message === 'OK') {
			const urlObject = URL.createObjectURL(file)
			return { urlObject, mediaId: result.data.mediaId }
		}
		return null
	}

	const handleDelete = async (file?: string) => {
		const index = photos?.findIndex((item: string) => item === file)

		if (index !== -1 && photos && !initialImagesUrls) {
			const updatedMediaIds = [...mediaId]

			const result = await deleteMedia(updatedMediaIds[index])

			if (result?.message === 'OK') {
				handleRemovingImage(index)
			}
		} else if (initialImagesUrls) {
			handleRemovingImage(index)
		}
	}

	const handleRemovingImage = (index: number) => {
		const updatedPhotos = [...photos]
		const updatedMediaIds = [...mediaId]

		updatedPhotos.splice(index, 1)
		updatedMediaIds.splice(index, 1)
		setPhotos(updatedPhotos)
		setMediaId(updatedMediaIds)
		handleInputValue(updatedMediaIds)
	}

	const handleInputValue = (value: any) => {
		if (rest.onChange) {
			rest.onChange(value)
		}
	}

	useEffect(() => {
		if (initialImagesUrls) {
			setPhotos(initialImagesUrls)
		}
		if (rest.value) {
			setMediaId(rest.value as string[])
		}
	}, [])

	return (
		<Inline gap={6}>
			<input
				id={rest.id}
				name={rest.id}
				type="file"
				accept="image/*"
				multiple
				onChange={handleFileChange}
				className={styles.fileInput}
			/>
			<label htmlFor={rest.id} className={styles.photoUploadLabel}>
				<Box padding={2}>
					<UploadIcon size="xlarge" />
				</Box>
				{t('General.maxPhotoUploadCountinstructions')}
				<br />
				{t('General.photoUploadInstructions')}
			</label>
			{photos &&
				photos.map((photo: string) => (
					<Box position="relative" style={{ height: '212px' }}>
						<Box className={styles.imageDeleteIconContainer}>
							<IconDeleteButton onDelete={() => handleDelete(photo)} />
						</Box>
						<Image src={photo} width={212} height={212} alt="uploadedPhoto" style={{ objectFit: 'cover' }} />
					</Box>
				))}
		</Inline>
	)
}
