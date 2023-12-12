import axios from 'axios'

export const instance = axios.create({ baseURL: 'https://test.com' })

export const axiosInstanceWithToken = axios.create({
	baseURL: 'https://test.com'
})

const token = ''
axiosInstanceWithToken.defaults.headers.common.Authorization = `Bearer ${token}`
