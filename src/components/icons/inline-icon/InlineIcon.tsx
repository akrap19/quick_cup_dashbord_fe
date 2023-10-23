import { ComponentType, SVGProps } from 'react'

import { Atoms, atoms } from 'style/atoms.css'

interface Props {
	icon: ComponentType<SVGProps<SVGSVGElement>>
	color?: Atoms['color']
}

export const InlineIcon = ({ icon: Icon, color }: Props) => {
	return <Icon width="1em" height="1em" className={atoms({ color })} />
}
