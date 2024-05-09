import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/Instance'

export const getSeenOnboardings = async () => {
	const response = await fetchWithToken(`/onboarding`)

	return response.json()
}

export const onboardingSeen = async (onboardingSection: string) => {
	const response = await axiosInstanceWithToken.post(`/onboarding`, { onboardingSection })

	return response?.data
}
