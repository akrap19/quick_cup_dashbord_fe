export const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']

export const DOCUMENT_EXTENSIONS = [
	'.pdf',
	'.doc',
	'.docx',
	'.ai',
	'.psd',
	'.eps',
	'.indd',
	'.sketch',
	'.fig',
	'.xd',
	'.psb'
]

export const isDocumentFile = (fileName?: string, mimeType?: string): boolean => {
	if (!fileName && !mimeType) return false

	const name = (fileName || '').toLowerCase()
	const mime = (mimeType || '').toLowerCase()

	// Check MIME type
	if (mime.includes('pdf') || mime.includes('document') || mime.includes('msword') || mime.includes('wordprocessingml'))
		return true

	// Check file extension
	return DOCUMENT_EXTENSIONS.some(ext => name.endsWith(ext))
}

export const isImageByExtension = (url: string, fileName: string): boolean => {
	const urlToCheck = url.toLowerCase()
	const nameToCheck = fileName.toLowerCase()
	return IMAGE_EXTENSIONS.some(ext => urlToCheck.includes(ext) || nameToCheck.endsWith(ext))
}

export const isPdfFile = (fileName: string, url: string): boolean => {
	const nameToCheck = fileName.toLowerCase()
	const urlToCheck = url.toLowerCase()
	return nameToCheck.endsWith('.pdf') || urlToCheck.includes('.pdf')
}

export const getInitialImageState = (url?: string): boolean => {
	if (!url) return false
	const urlLower = url.toLowerCase()
	return IMAGE_EXTENSIONS.some(ext => urlLower.includes(ext)) || urlLower.startsWith('blob:')
}
