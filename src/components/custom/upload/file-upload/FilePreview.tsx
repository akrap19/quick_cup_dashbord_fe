import Image from 'next/image'
import { Box } from '@/components/layout/box'
import { UploadIcon } from '@/components/icons/upload-icon'
import { tokens } from '@/style/theme.css'
import { isImageByExtension, isPdfFile } from './fileTypeUtils'

type FilePreviewProps = {
	displayUrl: string
	fileName: string
	fileType?: string
	isImage: boolean
	isDocument: boolean
}

const PREVIEW_SIZE = { width: '242px', height: '300px' }

const PlaceholderPreview = ({ fileName }: { fileName: string }) => (
	<Box
		style={{
			...PREVIEW_SIZE,
			borderRadius: '8px',
			backgroundColor: tokens.colors['neutral.150'],
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: tokens.spacing[4],
			border: tokens.borders.border.thin,
			borderColor: tokens.borders.color['neutral.300']
		}}>
		<Box style={{ textAlign: 'center' }}>
			<Box paddingBottom={2}>
				<UploadIcon size="large" />
			</Box>
			<Box
				style={{
					fontSize: tokens.typography.size.xsmall,
					color: tokens.colors['neutral.800'],
					wordBreak: 'break-word'
				}}>
				{fileName || 'Design template'}
			</Box>
		</Box>
	</Box>
)

const DocumentPreview = ({ displayUrl, fileName, fileType }: { displayUrl: string; fileName: string; fileType?: string }) => {
	const isPdf = isPdfFile(fileName, displayUrl)

	return (
		<Box
			style={{
				...PREVIEW_SIZE,
				borderRadius: '8px',
				overflow: 'hidden',
				border: tokens.borders.border.thin,
				borderColor: tokens.borders.color['neutral.300']
			}}>
			{isPdf ? (
				<iframe
					src={displayUrl}
					style={{
						width: '100%',
						height: '100%',
						border: 'none',
						borderRadius: '8px'
					}}
					title={fileName || 'Document'}
				/>
			) : (
				<object
					data={displayUrl}
					type={fileType || 'application/pdf'}
					style={{
						width: '100%',
						height: '100%',
						border: 'none',
						borderRadius: '8px'
					}}>
					<PlaceholderPreview fileName={fileName || 'Document'} />
				</object>
			)}
		</Box>
	)
}

const ImagePreview = ({ displayUrl, fileName }: { displayUrl: string; fileName: string }) => (
	<Image
		src={displayUrl}
		width={242}
		height={300}
		alt={fileName || 'Design template'}
		style={{ objectFit: 'contain', borderRadius: '8px' }}
	/>
)

export const FilePreview = ({ displayUrl, fileName, fileType, isImage, isDocument }: FilePreviewProps) => {
	if (!displayUrl) {
		return <PlaceholderPreview fileName={fileName} />
	}

	const urlToCheck = displayUrl.toLowerCase()
	const isBlobUrl = urlToCheck.startsWith('blob:')
	const hasImageExtension = isImageByExtension(displayUrl, fileName)
	
	// Determine if it's an image file
	let isImageFile = hasImageExtension
	if (isBlobUrl) {
		isImageFile = isImage && !isDocument
	}
	if (isDocument) {
		isImageFile = false
	}

	if (isImageFile) {
		return <ImagePreview displayUrl={displayUrl} fileName={fileName} />
	}

	if (isDocument || !isImageFile) {
		return <DocumentPreview displayUrl={displayUrl} fileName={fileName} fileType={fileType} />
	}

	return <PlaceholderPreview fileName={fileName} />
}

