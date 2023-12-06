'use client'

import { useEffect } from 'react'

import { Text } from '@/components/typography/text'

const HomePage = () => {
	useEffect(() => {
		console.log(process.env.GIT_BRANCH)
	}, [])

	return <Text>Index page</Text>
}

export default HomePage
