import { ReactNode } from 'react'

import { Box } from '@/components/layout/box'

interface Props {
	children: ReactNode
}

export const FormWrapper = ({ children }: Props) => {
	return (
		<Box padding={10} width="100%">
			<Box
				padding={6}
				style={{ maxWidth: '60rem' }}
				backgroundColor="neutral.50"
				border="thin"
				borderColor="neutral.300">
				{children}
			</Box>
		</Box>
	)
}
