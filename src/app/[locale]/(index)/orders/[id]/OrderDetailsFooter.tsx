'use client'

import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { Badge } from '@/components/custom/badge'

import { footer } from './OrderDetailsFooter.css'

interface Props {
	totalAmountLabel: string
	status: string
}

export const OrderDetailsFooter = ({ totalAmountLabel, status }: Props) => {
	return (
		<Box className={footer}>
			<Text fontSize="xbig" color="neutral.900" fontWeight="semibold">
				{totalAmountLabel}
			</Text>
			<Inline gap={4} alignItems="center">
				<Badge variant={status?.toLowerCase() as any} />
			</Inline>
		</Box>
	)
}
