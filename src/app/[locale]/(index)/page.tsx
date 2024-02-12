'use client'

import { useSession } from 'next-auth/react'

import { Text } from '@/components/typography/text'

const HomePage = () => {
	const session = useSession()

	console.log('session', session)
	return <Text>Index page of {process.env.GIT_BRANCH}</Text>
}

export default HomePage
