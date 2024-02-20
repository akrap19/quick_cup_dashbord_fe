'use client'

import { useState } from 'react'

export interface OpenedProps {
	opened: boolean
	toggleOpened: () => void
}

export const useOpened = (): OpenedProps => {
	const [opened, setOpened] = useState(false)

	const toggleOpened = () => {
		setOpened(prevValue => !prevValue)
	}

	return { opened, toggleOpened }
}
