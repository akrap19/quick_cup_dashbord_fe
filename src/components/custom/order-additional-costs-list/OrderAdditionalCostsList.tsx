'use client'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { OrderAdditionalCost } from 'api/models/order/orderAdditionalCost'

interface OrderAdditionalCostsListProps {
	additionalCosts: OrderAdditionalCost[]
}

export const OrderAdditionalCostsList = ({ additionalCosts }: OrderAdditionalCostsListProps) => {
	return (
		<Box style={{ gridColumn: 'span 2' }}>
			<Stack gap={0}>
				{additionalCosts.map(orderAdditionalCost => (
					<Box key={orderAdditionalCost.id} paddingY={3} paddingX={0} style={{ borderBottom: '1px solid #E5E7EB' }}>
						<Inline justifyContent="space-between" alignItems="center" gap={3}>
							<Box display="flex" style={{ flex: 1 }}>
								<Text fontSize="medium" color="neutral.900" fontWeight="semibold">
									{orderAdditionalCost.additionalCost?.name || ''}
								</Text>
							</Box>
							<Box display="flex" alignItems="flex-start" paddingTop={1}>
								<Text color="neutral.900" fontSize="medium" fontWeight="semibold">
									{orderAdditionalCost.price.toFixed(3)}€
								</Text>
							</Box>
						</Inline>
					</Box>
				))}
			</Stack>
		</Box>
	)
}
