import { fetchWithToken } from 'api/instances/FetchWithToken'
import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'

export const getMedia = (mediaId: string) => {
	return fetchWithToken(`/media/${mediaId}/download`)
}

export const downloadMedia = async (mediaId: string, filename?: string) => {
	const response = await axiosInstanceWithToken.get(`/media/${mediaId}/download`, {
		responseType: 'blob'
	})

	// Extract filename from Content-Disposition header if available
	let downloadFilename = filename
	if (!downloadFilename) {
		const contentDisposition = response.headers['content-disposition']
		if (contentDisposition) {
			const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
			if (filenameMatch && filenameMatch[1]) {
				downloadFilename = filenameMatch[1].replace(/['"]/g, '')
			}
		}
	}

	// Default filename if still not set
	if (!downloadFilename) {
		downloadFilename = `file-${mediaId}`
	}

	// Create blob URL and trigger download
	const blob = new Blob([response.data])
	const url = window.URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = downloadFilename
	link.style.display = 'none'
	document.body.appendChild(link)
	link.click()

	// Clean up
	setTimeout(() => {
		document.body.removeChild(link)
		window.URL.revokeObjectURL(url)
	}, 100)
}
