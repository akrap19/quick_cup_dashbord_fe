import { ReactNode } from 'react'

import { Box } from '@/components/layout/box'
import { Columns } from '@/components/layout/columns'
import { Stack } from '@/components/layout/stack'

interface Props {
	children: ReactNode[]
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
				<Columns gap={6}>
					{children?.map((c, i) => (
						<Columns.Item columns={6}>
							<Box paddingBottom={i < children.length - 2 ? 3 : 0}>
								<Stack gap={4}>{c}</Stack>
							</Box>
						</Columns.Item>
					))}
				</Columns>
			</Box>
		</Box>
	)
}
