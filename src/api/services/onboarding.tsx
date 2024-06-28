import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'

export const getSeenOnboardings = () => {
	return fetchWithToken(`/onboarding`)
}

export const onboardingSeen = async (onboardingSection: string) => {
	const response = await axiosInstanceWithToken.post(`/onboarding`, { onboardingSection })

	return response?.data
}

export const deleteOnboarding = async (onboardingSection: string) => {
	const response = await axiosInstanceWithToken.delete(`/onboarding`, { data: { onboardingSection } })

	return response?.data
}
