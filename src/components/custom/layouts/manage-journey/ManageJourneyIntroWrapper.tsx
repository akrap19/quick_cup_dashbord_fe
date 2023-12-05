import { ReactNode } from 'react'

import { Box } from '@/components/layout/box'

interface Props {
	children: ReactNode
}

export const ManageJourneyIntroWrapper = ({ children }: Props) => {
	return (
		<Box
			display="flex"
			align="center"
			justify="center"
			style={{
				minHeight: '37rem'
			}}>
			<Box
				style={{
					maxWidth: '26rem'
				}}>
				{children}
			</Box>
		</Box>
	)
}
