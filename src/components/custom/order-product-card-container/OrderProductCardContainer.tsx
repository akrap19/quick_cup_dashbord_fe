'use client'

import { ReactNode } from 'react'
import { Inline } from '@/components/layout/inline'
import { Box } from '@/components/layout/box'

interface OrderProductCardContainerProps {
	imageSection: ReactNode
	productInfoSection: ReactNode
	rightSection: ReactNode
}

export const OrderProductCardContainer = ({
	imageSection,
	productInfoSection,
	rightSection
}: OrderProductCardContainerProps) => {
	return (
		<Box paddingY={3} paddingX={3} borderRadius="small" boxShadow="large">
			<Inline justifyContent="space-between" alignItems="flex-start">
				<Inline justifyContent="center" alignItems="flex-start" gap={3}>
					<Box style={{ width: '140px', height: '150px' }}>{imageSection}</Box>
					<Box position="relative" style={{ height: '150px' }}>
						{productInfoSection}
					</Box>
				</Inline>
				<Box style={{ height: '150px' }}>{rightSection}</Box>
			</Inline>
		</Box>
	)
}
