import axios from 'axios'

export const instance = axios.create({ baseURL: 'https://barnahus-journeys-be-dev-pjqvrfz4wa-lz.a.run.app/' })

export const axiosInstanceWithToken = axios.create({
	baseURL: 'https://barnahus-journeys-be-dev-pjqvrfz4wa-lz.a.run.app/'
})

const token = ''
axiosInstanceWithToken.defaults.headers.common.Authorization = `Bearer ${token}`
