/* eslint-disable no-undef */
import { ReactNode } from 'react'

import { InputInfo } from '@/components/inputs/input-info'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'

interface Props {
	children: ReactNode
	infoText: string
}
export const InputWithInfo = ({ children, infoText }: Props) => {
	return (
		<Inline gap={4} alignItems="flex-end">
			<Box flex="1">{children}</Box>
			<Box style={{ height: '2rem' }}>
				<InputInfo infoText={infoText} />
			</Box>
		</Inline>
	)
}
