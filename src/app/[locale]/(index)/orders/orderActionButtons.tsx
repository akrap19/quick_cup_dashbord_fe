'use client'

import { Button } from '@/components/inputs/button'
import { KeyIcon } from '@/components/icons/key-icon'
import { Inline } from '@/components/layout/inline'
import { ROUTES } from 'parameters'
import { ShoppingBagIcon } from '@/components/icons/shopping-bag-icon'
import { useTranslations } from 'next-intl'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { useRouter } from 'next/navigation'

export const OrderActionButtons = () => {
	const t = useTranslations()
	const { push } = useRouter()

	const handleCreateBuyOrder = (acquisitionType: AcquisitionTypeEnum) => {
		push(ROUTES.ADD_ORDERS + '?acquisitionType=' + acquisitionType)
	}

	return (
		<Inline justifyContent="center" gap={4}>
			<Button variant="success" size="large" onClick={() => handleCreateBuyOrder(AcquisitionTypeEnum.BUY)}>
				<ShoppingBagIcon />
				{t('Orders.createBuyOrder')}
			</Button>
			<Button variant="primary" size="large" onClick={() => handleCreateBuyOrder(AcquisitionTypeEnum.RENT)}>
				<KeyIcon />
				{t('Orders.createRentOrder')}
			</Button>
		</Inline>
	)
}
