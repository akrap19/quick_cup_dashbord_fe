'use client'

import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Badge } from '@/components/custom/badge'

import { footer } from './OrderDetailsFooter.css'

interface Props {
	status: string
}

export const OrderDetailsFooter = ({ status }: Props) => {
	return (
		<Box className={footer}>
			<div />
			<Inline gap={4} alignItems="center">
				<Badge variant={status?.toLowerCase() as any} />
			</Inline>
		</Box>
	)
}
