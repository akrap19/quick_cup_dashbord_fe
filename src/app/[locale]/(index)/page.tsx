'use client'

import { Text } from '@/components/typography/text'
import { useSession } from 'next-auth/react'

const HomePage = () => {
	const { data: session } = useSession()

	console.log('session', session)
	return <Text>Index page of {process.env.GIT_BRANCH}</Text>
}

export default HomePage
