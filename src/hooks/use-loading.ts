'use client'

import { useState } from 'react'

export const useLoading = () => {
	const [isLoading, setIsLoading] = useState(false)

	const toggleLoading = () => {
		setIsLoading(prevValue => !prevValue)
	}

	return { isLoading, toggleLoading }
}
