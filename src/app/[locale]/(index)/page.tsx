'use client'

import { useEffect } from 'react'

import { Text } from '@/components/typography/text'

const HomePage = () => {
	useEffect(() => {
		localStorage.setItem('b', process.env.GIT_BRANCH ?? 'none')
	}, [])

	return <Text>Index page</Text>
}

export default HomePage
