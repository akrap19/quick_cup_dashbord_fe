import { CSSProperties, PropsWithChildren } from 'react'

import { Atoms } from 'style/atoms.css'

import { Box } from '../box/Box'

type Props = PropsWithChildren<Pick<Atoms, 'justifyContent' | 'alignItems' | 'gap'>> & { style?: CSSProperties }

export const Stack = ({ children, style, ...rest }: Props) => (
	<Box display="flex" flexDirection="column" style={style} {...rest}>
		{children}
	</Box>
)
