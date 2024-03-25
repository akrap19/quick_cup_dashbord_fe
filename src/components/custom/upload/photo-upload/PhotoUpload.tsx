import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { UploadIcon } from '@/components/icons/upload-icon'
import { Box } from '@/components/layout/box'

import * as styles from './PhotoUpload.css'
import React, { InputHTMLAttributes, useState } from 'react'
import { Inline } from '@/components/layout/inline'
import { IconDeleteButton } from '../../button/icon-delete-button/IconDeleteButton'

type Props = InputHTMLAttributes<HTMLInputElement>

export const PhotoUpload = ({ ...rest }: Props) => {
	const t = useTranslations()
	const [photos, setPhotos] = useState<string[]>()
	const handleFileChange = (event: any) => {
		const files = event.target.files
		const urlObjects = Object.keys(files).map(key => URL.createObjectURL(files[key]))
		const photosForUpload = photos ? [...photos, ...urlObjects] : urlObjects
		setPhotos(photosForUpload)
		handleInputValue(photosForUpload)
	}

	const handleDelete = (file?: string) => {
		const updatedPhotos = photos?.filter((item: string) => item !== file)
		setPhotos(updatedPhotos)
		handleInputValue(updatedPhotos)
	}

	const handleInputValue = (value: any) => {
		if (rest.onChange) {
			rest.onChange(value)
		}
	}

	return (
		<Inline gap={6}>
			<input
				id={rest.id}
				name={rest.id}
				type="file"
				accept="image/*"
				multiple={true}
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
						<Image src={photo} width={212} height={212} alt="logo" />
					</Box>
				))}
		</Inline>
	)
}
