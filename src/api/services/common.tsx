import { instance } from 'api/Instance'

export const media = async (barnahusId: string, type: string) => {
	const { data } = await instance.post(`/media`, { barnahusId, type })

	return data
}
