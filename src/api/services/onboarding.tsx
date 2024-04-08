import { axiosInstanceWithToken, fetchWithToken } from 'api/Instance'

export const getSeenOnboardings = async () => {
	const response = await fetchWithToken(`/onboarding`)

	return response.json()
}

export const onboardingSeen = async (onboardingSection: string) => {
	const { data } = await axiosInstanceWithToken.post(`/onboarding`, { onboardingSection })

	return data
}
