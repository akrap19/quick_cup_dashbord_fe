import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'

export const media = async (type: string, file: File) => {
	const formData = new FormData()
	formData.append('media', file)

	const response = await axiosInstanceWithToken.post(`/media?type=${type}`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})

	return response?.data
}

export const deleteMedia = async (mediaId: string) => {
	const response = await axiosInstanceWithToken.delete(`/media`, {
		data: { mediaId }
	})

	return response?.data
}
