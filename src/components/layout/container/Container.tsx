import { ReactNode } from 'react'

import { container } from './Container.css'

interface Props {
	children: ReactNode
	width?: keyof typeof container
}

export const Container = ({ children, width = 'large' }: Props) => {
	return <div className={container[width]}>{children}</div>
}
