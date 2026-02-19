'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/inputs/button'
import { Inline } from '@/components/layout/inline'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useTableStore } from '@/store/table'
import { useOrderWizardStore } from '@/store/order-wizard'
import { Order } from 'api/models/order/order'
import { updateOrderStatus } from 'api/services/orders'
import { OrderStatusEnum } from 'enums/orderStatusEnum'
import { ROUTES } from 'parameters'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { UserRoleEnum } from 'enums/userRoleEnum'
import { hasRoleAccess } from 'utils/hasRoleAccess'

interface Props {
	selectedItem: Order
}

export const OrderStatusButtons = ({ selectedItem }: Props) => {
	const t = useTranslations()
	const { clearCheckedItems } = useTableStore()
	const { push, refresh } = useRouter()
	const { data: session } = useSession()
	const { setCurrentStep, setAcquisitionType } = useOrderWizardStore()

	if (!selectedItem) {
		return null
	}

	const handleStatusUpdate = async (newStatus: OrderStatusEnum) => {
		if (!selectedItem?.id) {
			return
		}

		const result = await updateOrderStatus(newStatus, selectedItem.id)

		if (result?.message === 'OK' || result) {
			SuccessToast(t('Orders.statusUpdated'))
			clearCheckedItems()
			refresh()
		}
	}

	const handleNavigateToServiceLocations = () => {
		if (!selectedItem?.id) {
			return
		}

		const userRole = session?.user?.roles[0]?.name
		const isAdmin = hasRoleAccess(userRole, [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN])

		// Services step: step 3 for admin, step 2 for non-admin
		const servicesStep = isAdmin ? 3 : 2

		const acquisitionType = selectedItem.acquisitionType || AcquisitionTypeEnum.BUY

		// Set the step and acquisition type in the store before navigating
		setAcquisitionType(acquisitionType)
		setCurrentStep(servicesStep, acquisitionType)

		// Navigate to edit order page
		push(ROUTES.EDIT_ORDERS + selectedItem.id)
	}

	const handleNavigateToSetServiceLocation = () => {
		if (!selectedItem?.id) {
			return
		}

		// Navigate to step 1 (client selection) for admin to set service location
		const clientSelectionStep = 1

		const acquisitionType = selectedItem.acquisitionType || AcquisitionTypeEnum.BUY

		// Set the step and acquisition type in the store before navigating
		setAcquisitionType(acquisitionType)
		setCurrentStep(clientSelectionStep, acquisitionType)

		// Navigate to edit order page
		push(ROUTES.EDIT_ORDERS + selectedItem.id)
	}

	// Check if all services have service locations set
	const hasAllServiceLocations = () => {
		const services = selectedItem.services || []
		if (services.length === 0) {
			return true // No services means all have locations (none needed)
		}

		// Check if all services that are included (quantity > 0) have serviceLocationId
		return services.every(service => {
			// If service has no quantity, it might not need a location
			if (!service.quantity || service.quantity === 0) {
				return true
			}
			// Service with quantity must have a serviceLocationId
			return !!service.serviceLocationId
		})
	}

	const currentStatus = selectedItem.status as OrderStatusEnum
	const userRole = session?.user?.roles[0]?.name
	const isService = hasRoleAccess(userRole, [UserRoleEnum.SERVICE])
	const isAdmin = hasRoleAccess(userRole, [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN])
	const hasServiceLocation = !!selectedItem.serviceLocation?.id
	const acquisitionType = selectedItem.acquisitionType || AcquisitionTypeEnum.BUY
	const isRent = acquisitionType === AcquisitionTypeEnum.RENT

	// Service users can only change status from PAYMENT_RECEIVED onwards
	if (
		isService &&
		currentStatus !== OrderStatusEnum.PAYMENT_RECEIVED &&
		currentStatus !== OrderStatusEnum.IN_PRODUCTION &&
		currentStatus !== OrderStatusEnum.READY &&
		currentStatus !== OrderStatusEnum.IN_TRANSIT &&
		currentStatus !== OrderStatusEnum.FINAL_PAYMENT_PENDING
	) {
		return null
	}

	const buttons: JSX.Element[] = []

	switch (currentStatus) {
		case OrderStatusEnum.PENDING:
			buttons.push(
				<Button key="accepted" variant="success" onClick={() => handleStatusUpdate(OrderStatusEnum.ACCEPTED)}>
					{t('Orders.statusAccepted')}
				</Button>,
				<Button key="declined" variant="destructive" onClick={() => handleStatusUpdate(OrderStatusEnum.DECLINED)}>
					{t('Orders.statusDeclined')}
				</Button>
			)
			break
		case OrderStatusEnum.ACCEPTED:
			if (isAdmin && !hasServiceLocation) {
				buttons.push(
					<Button key="set-service-location" variant="primary" onClick={handleNavigateToSetServiceLocation}>
						{t('Orders.setDedicatedServiceLocation')}
					</Button>
				)
			}
			{
				hasServiceLocation &&
					buttons.push(
						<Button
							key="payment-pending"
							variant="primary"
							onClick={() => handleStatusUpdate(OrderStatusEnum.PAYMENT_PENDING)}>
							{t('Orders.statusPaymentPending')}
						</Button>
					)
			}
			break
		case OrderStatusEnum.PAYMENT_PENDING:
			buttons.push(
				<Button
					key="payment-received"
					variant="success"
					onClick={() => handleStatusUpdate(OrderStatusEnum.PAYMENT_RECEIVED)}>
					{t('Orders.statusPaymentReceived')}
				</Button>
			)
			break
		case OrderStatusEnum.PAYMENT_RECEIVED:
			!hasAllServiceLocations()
				? buttons.push(
						<Button key="service-locations" variant="primary" onClick={handleNavigateToServiceLocations}>
							{t('Orders.setServiceLocations')}
						</Button>
					)
				: buttons.push(
						<Button
							key="in-production"
							variant="primary"
							onClick={() => handleStatusUpdate(OrderStatusEnum.IN_PRODUCTION)}>
							{t('Orders.statusInProduction')}
						</Button>
					)
			break
		case OrderStatusEnum.IN_PRODUCTION:
			buttons.push(
				<Button key="ready" variant="success" onClick={() => handleStatusUpdate(OrderStatusEnum.READY)}>
					{t('Orders.statusReady')}
				</Button>
			)
			break
		case OrderStatusEnum.READY:
			buttons.push(
				<Button key="in-transit" variant="primary" onClick={() => handleStatusUpdate(OrderStatusEnum.IN_TRANSIT)}>
					{t('Orders.statusInTransit')}
				</Button>
			)
			break
		case OrderStatusEnum.IN_TRANSIT:
			// For rent orders, skip FINAL_PAYMENT_PENDING and go directly to COMPLETED
			if (isRent) {
				buttons.push(
					<Button key="completed" variant="success" onClick={() => handleStatusUpdate(OrderStatusEnum.COMPLETED)}>
						{t('Orders.statusCompleted')}
					</Button>
				)
			} else {
				buttons.push(
					<Button
						key="final-payment-pending"
						variant="primary"
						onClick={() => handleStatusUpdate(OrderStatusEnum.FINAL_PAYMENT_PENDING)}>
						{t('Orders.statusFinalPaymentPending')}
					</Button>
				)
			}
			break
		case OrderStatusEnum.FINAL_PAYMENT_PENDING:
			buttons.push(
				<Button key="completed" variant="success" onClick={() => handleStatusUpdate(OrderStatusEnum.COMPLETED)}>
					{t('Orders.statusCompleted')}
				</Button>
			)
			break
		default:
			return null
	}

	return buttons.length > 0 ? (
		<Inline gap={4} alignItems="center">
			{buttons}
		</Inline>
	) : null
}
