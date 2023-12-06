import { Text } from '@/components/typography/text'
import { useEffect } from 'react'

const HomePage = () => {
	useEffect(() => {
		if (process.env.GIT_BRANCH) {
			localStorage.setItem('', process.env.GIT_BRANCH)
		}
	}, [])

	return <Text>Index page</Text>
}

export default HomePage
