import { useTranslations } from 'next-intl'
import { Box } from '@/components/layout/box'
import { UploadIcon } from '@/components/icons/upload-icon'
import { PulseLoader } from '@/components/custom/loader/PulseLoader'
import * as styles from './FileUpload.css'

type UploadLabelProps = {
	inputId?: string
	isLoading?: boolean
}

export const UploadLabel = ({ inputId, isLoading }: UploadLabelProps) => {
	const t = useTranslations()

	return (
		<label htmlFor={inputId} className={styles.fileUploadLabel}>
			{isLoading ? (
				<>
					<Box padding={2}>
						<PulseLoader />
					</Box>
					{t('General.loading')}
				</>
			) : (
				<>
					<Box padding={2}>
						<UploadIcon size="xlarge" />
					</Box>
					{t('General.uploadFile')}
					<br />
					{t('General.fileUploadInstructions')}
				</>
			)}
		</label>
	)
}
