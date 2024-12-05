import { ReactNode } from 'react'

import { OpenedProps } from '@/hooks/use-toggle'

export interface NavbarItems {
	title?: string
	backLabel?: string
	cancelDialog?: OpenedProps
	useUserDropdown?: boolean
	actionButton?: ReactNode
	location?: string
}
