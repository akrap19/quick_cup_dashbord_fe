'use client'

import { useEffect } from 'react'

import { Text } from '@/components/typography/text'

const HomePage = () => {
	useEffect(() => {
		if (process.env.GIT_BRANCH) {
			localStorage.setItem('', process.env.GIT_BRANCH)
		}
	}, [])

	return <Text>Index page</Text>
}

export default HomePage
