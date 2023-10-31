import clsx from 'clsx'
import { ComponentType, SVGProps } from 'react'

import { Atoms, atoms } from 'style/atoms.css'

import { sizes } from './BlockIcon.css'

interface Props {
	icon: ComponentType<SVGProps<SVGSVGElement>>
	size?: keyof typeof sizes
	color?: Atoms['color']
	cursor?: Atoms['cursor']
	onClick?: () => void
}

export const BlockIcon = ({ icon: Icon, size = 'large', color, cursor, onClick }: Props) => {
	return <Icon className={clsx(sizes[size], atoms({ color, cursor }))} viewBox="0 0 24 24" onClick={onClick} />
}
