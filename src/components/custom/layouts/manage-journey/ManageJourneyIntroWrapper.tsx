import { ReactNode } from 'react'

import { Box } from '@/components/layout/box'

interface Props {
	children: ReactNode
}

export const ManageJourneyIntroWrapper = ({ children }: Props) => {
	return (
		<Box
			style={{
				minHeight: '37rem'
			}}>
			<Box
				position="absolute"
				style={{
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					maxWidth: '26rem'
				}}>
				{children}
			</Box>
		</Box>
	)
}
