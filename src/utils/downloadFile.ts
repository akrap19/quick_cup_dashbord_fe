/**
 * Downloads a file or image from a URL
 * Simple approach that avoids CORS issues by using direct link
 * @param url - The URL of the file to download
 * @param filename - Optional filename for the downloaded file. If not provided, will try to extract from URL
 */
export const downloadFile = (url: string, filename?: string) => {
	// Extract filename from URL if not provided
	let downloadFilename = filename
	if (!downloadFilename) {
		try {
			const urlPath = new URL(url).pathname
			const urlFilename = urlPath.split('/').pop() || 'download'
			downloadFilename = urlFilename.includes('.') ? urlFilename : 'download'
		} catch {
			downloadFilename = 'download'
		}
	}

	// Create a link and trigger download
	// For same-origin files, this will work directly
	// For cross-origin files, browser will handle it (may open in new tab if CORS blocks)
	const link = document.createElement('a')
	link.href = url
	link.download = downloadFilename
	link.style.display = 'none'
	link.target = '_blank' // Open in new tab if download attribute doesn't work
	document.body.appendChild(link)

	link.click()

	// Clean up after a short delay
	setTimeout(() => {
		document.body.removeChild(link)
	}, 100)
}

/**
 * Checks if a URL points to an image file
 * @param url - The URL to check
 * @returns true if the URL appears to be an image
 */
export const isImageUrl = (url: string): boolean => {
	const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']
	const urlLower = url.toLowerCase()
	return imageExtensions.some(ext => urlLower.includes(ext)) || urlLower.includes('image/')
}

/**
 * Checks if a file is a document file (PDF, DOC, etc.)
 * @param fileName - The file name to check
 * @param url - Optional URL to check
 * @returns true if the file appears to be a document
 */
export const isDocumentFile = (fileName?: string, url?: string): boolean => {
	if (!fileName && !url) return false

	const name = (fileName || '').toLowerCase()
	const urlLower = (url || '').toLowerCase()

	// Check file extension
	const documentExtensions = ['.pdf', '.doc', '.docx', '.ai', '.psd', '.eps', '.indd', '.sketch', '.fig', '.xd', '.psb']
	const hasDocumentExtension = documentExtensions.some(ext => name.endsWith(ext) || urlLower.includes(ext))

	// Check MIME type in URL
	const hasDocumentMime =
		urlLower.includes('pdf') ||
		urlLower.includes('document') ||
		urlLower.includes('msword') ||
		urlLower.includes('wordprocessingml')

	return hasDocumentExtension || hasDocumentMime
}

/**
 * Constructs a file URL from a fileId
 * @param fileId - The file ID to construct URL from
 * @returns The full URL to the media file
 */
export const getFileUrl = (fileId: string): string => {
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
	return `${baseUrl}/media/${fileId}`
}
