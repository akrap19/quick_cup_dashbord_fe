'use client'

import { useEffect } from 'react'

import { Text } from '@/components/typography/text'

const HomePage = () => {
	useEffect(() => {
		setTimeout(() => {
			localStorage.setItem('b', process.env.GIT_BRANCH ?? 'none')
		}, 1000)
	}, [])

	return <Text>Index page</Text>
}

export default HomePage
