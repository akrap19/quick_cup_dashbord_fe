'use client'

import { Text } from '@/components/typography/text'

const HomePage = () => {
	return <Text>Index page of {process.env.GIT_BRANCH}</Text>
}

export default HomePage
