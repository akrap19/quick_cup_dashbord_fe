import { ReactNode } from 'react'

import { Box } from '@/components/layout/box'
import { tokens } from '@/style/theme.css'

interface Props {
	children: ReactNode
}

export const DetailsWrapper = ({ children }: Props) => {
	return (
		<Box padding={10} width="100%">
			<Box
				padding={6}
				style={{ maxWidth: '60rem' }}
				backgroundColor="neutral.50"
				border="thin"
				borderColor="neutral.300">
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						columnGap: tokens.spacing[6],
						rowGap: tokens.spacing[8]
					}}>
					{children}
				</div>
			</Box>
		</Box>
	)
}
