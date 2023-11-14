import { Box } from '@/components/layout/box'
import { ReactNode } from 'react'

interface FormWrapperProps {
	children: ReactNode
}

export const FormWrapper = ({ children }: FormWrapperProps) => {
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
