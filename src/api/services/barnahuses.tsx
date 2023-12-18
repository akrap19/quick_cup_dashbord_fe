import { axiosInstanceWithToken } from 'api/Instance'
import { Barnahus } from 'api/models/barnahuses/barnahus'

export const getBarnahuses = async (): Promise<Barnahus[]> => {
	const res = await axiosInstanceWithToken.get(`/barnahuses`)

	return res?.data
}
