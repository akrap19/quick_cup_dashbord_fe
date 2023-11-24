import { useTranslations } from 'next-intl'

import * as styles from './AudioUpload.css'

export const AudioUpload = () => {
	const t = useTranslations()
	const handleFileChange = (event: any) => {
		const file = event.target.files[0]
		console.log(file)
	}

	return (
		<div>
			<input type="file" accept="audio/*" id="audioInput" onChange={handleFileChange} className={styles.fileInput} />
			<label htmlFor="audioInput" className={styles.audioUploadLabel}>
				{t('General.uploadAudio')}
			</label>
		</div>
	)
}
