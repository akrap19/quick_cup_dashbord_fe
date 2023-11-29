import { useTranslations } from 'next-intl'

import { UploadIcon } from '@/components/icons/upload-icon'
import { Box } from '@/components/layout/box'

import * as styles from './PhotoUpload.css'

export const PhotoUpload = () => {
	const t = useTranslations()
	const handleFileChange = (event: any) => {
		const file = event.target.files[0]
		console.log(file)
	}

	return (
		<div>
			<input type="file" accept="image/*" id="photoInput" onChange={handleFileChange} className={styles.fileInput} />
			<label htmlFor="photoInput" className={styles.photoUploadLabel}>
				<Box padding={2}>
					<UploadIcon size="xlarge" />
				</Box>
				{t('General.maxPhotoUploadCountinstructions')}
				<br />
				{t('General.photoUploadInstructions')}
			</label>
		</div>
	)
}
