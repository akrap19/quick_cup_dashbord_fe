import clsx from 'clsx'
import { ComponentType, SVGProps } from 'react'

import { Atoms, atoms } from 'style/atoms.css'

import { sizes } from './BlockIcon.css'

interface Props {
	icon: ComponentType<SVGProps<SVGSVGElement>>
	size?: keyof typeof sizes
	color?: Atoms['color']
}

export const BlockIcon = ({ icon: Icon, size = 'large', color }: Props) => {
	return <Icon className={clsx(sizes[size], atoms({ color }))} />
}
