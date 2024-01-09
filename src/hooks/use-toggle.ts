'use client'

import { useState } from 'react'

export const useOpened = () => {
	const [opened, setOpened] = useState(false)

	const toggleOpened = () => {
		setOpened(prevValue => !prevValue)
	}

	return { opened, toggleOpened }
}
