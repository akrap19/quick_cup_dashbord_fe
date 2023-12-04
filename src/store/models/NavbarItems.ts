import { ReactNode } from 'react'

export interface NavbarItems {
	title: string
	backLabel?: string
	useUserDropdown?: boolean
	actionButton?: ReactNode
	location?: string
}
