'use client'

import { Button } from '@/components/inputs/button'
import { KeyIcon } from '@/components/icons/key-icon'
import { Inline } from '@/components/layout/inline'
import { ROUTES } from 'parameters'
import { useBuyStore } from '@/store/buy'
import { useRentStore } from '@/store/rent'
import { ShoppingBagIcon } from '@/components/icons/shopping-bag-icon'
import { useTranslations } from 'next-intl'

export const OrderActionButtons = () => {
	const t = useTranslations()
	const buyItems = useBuyStore(state => state.selectedItems)
	const rentItems = useRentStore(state => state.selectedItems)
	const hasBuyItems = buyItems.length > 0
	const hasRentItems = rentItems.length > 0
	const buyLabel = hasBuyItems ? 'Orders.continueBuyOrder' : 'Orders.createBuyOrder'
	const rentLabel = hasRentItems ? 'Orders.continueRentOrder' : 'Orders.createRentOrder'

	return (
		<Inline justifyContent="center" gap={4}>
			<Button href={ROUTES.BUY} variant="success" size="large">
				<ShoppingBagIcon />
				{t(buyLabel)}
			</Button>
			<Button href={ROUTES.RENT} variant="primary" size="large">
				<KeyIcon />
				{t(rentLabel)}
			</Button>
		</Inline>
	)
}
