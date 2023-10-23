import { PropsWithChildren } from 'react'

import { Atoms } from 'style/atoms.css'

import { Box } from '../box/Box'

type Props = PropsWithChildren<Pick<Atoms, 'justifyContent' | 'alignItems' | 'gap' | 'flexWrap'>>

export const Inline = ({ children, ...rest }: Props) => (
	<Box display="flex" flexDirection="row" flexWrap="wrap" {...rest}>
		{children}
	</Box>
)
