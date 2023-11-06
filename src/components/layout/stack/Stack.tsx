import { PropsWithChildren } from 'react'

import { Atoms } from 'style/atoms.css'

import { Box } from '../box/Box'

type Props = PropsWithChildren<Pick<Atoms, 'justifyContent' | 'alignItems' | 'gap'>>

export const Stack = ({ children, ...rest }: Props) => (
	<Box display="flex" flexDirection="column" {...rest}>
		{children}
	</Box>
)
