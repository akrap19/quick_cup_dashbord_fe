'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'
import { useEffect, useMemo } from 'react'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Textarea } from '@/components/inputs/text-area'
import { TextInput } from '@/components/inputs/text-input'
import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'
import { OpenedProps } from '@/hooks/use-toggle'
import { Base } from 'api/models/common/base'
import { Product } from 'api/models/products/product'
import { Divider } from '@/components/layout/divider'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { OrderProductCard } from '@/components/custom/order-product-card/OrderProductCard'
import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'
import { AdditionalCostListItem } from '@/components/custom/additional-cost-card'
import { ServiceListItem } from '@/components/custom/service-card'
import { MethodOfPayment } from 'enums/methodOfPaymentEnum'
import { OrderStatusEnum } from 'enums/orderStatusEnum'
import { Service } from 'api/models/services/service'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

interface Props {
	cancelDialog?: OpenedProps
	customers: Base[]
	events: Base[]
	products: Product[]
	additionalCosts: AdditionalCosts[]
	isEditMode?: boolean
	orderStatus?: string
	acquisitionType?: AcquisitionTypeEnum
}

export const OrderForm = ({
	cancelDialog,
	customers,
	events,
	products,
	additionalCosts,
	isEditMode = false,
	orderStatus,
	acquisitionType
}: Props) => {
	const t = useTranslations()
	const form = useFormContext()
	const customerId = form.watch('customerId')
	const totalAmount = form.watch('totalAmount') === 0 ? 0 : form.watch('totalAmount')?.toFixed(3)
	const totalAmountLabel = t('Orders.totalAmount') + ': ' + totalAmount + '€'
	const formAcquisitionType = form.watch('acquisitionType') || acquisitionType || AcquisitionTypeEnum.BUY
	const formServices = form.watch('services') || []

	const hasAfterPaymentMethod = additionalCosts?.some(cost => cost.methodOfPayment === MethodOfPayment.AFTER)

	// In edit mode, filter out "after" payment items until status is IN_TRANSIT
	const visibleAdditionalCosts = isEditMode
		? additionalCosts?.filter(
				cost =>
					cost.methodOfPayment === MethodOfPayment.BEFORE ||
					(cost.methodOfPayment === MethodOfPayment.AFTER && orderStatus === OrderStatusEnum.IN_TRANSIT)
			)
		: additionalCosts

	// Collect unique services from all products
	const uniqueServices = useMemo(() => {
		const serviceMap = new Map<string, Service>()

		products.forEach((product: Product) => {
			if (product.servicePrices && product.servicePrices.length > 0) {
				product.servicePrices.forEach((service: Service) => {
					const serviceKey = service.id || service.serviceId
					if (serviceKey && !serviceMap.has(serviceKey)) {
						serviceMap.set(serviceKey, service)
					}
				})
			}
		})

		return Array.from(serviceMap.values())
	}, [products])

	const hasServices = uniqueServices.length > 0

	// Ensure all services from uniqueServices exist in formServices (for edit mode)
	useEffect(() => {
		if (!isEditMode || uniqueServices.length === 0) return

		const currentFormServices = form.getValues('services') || []
		const serviceMap = new Map(currentFormServices.map((fs: any) => [fs.serviceId, fs]))
		let needsUpdate = false
		const updatedServices = [...currentFormServices]
		const isRent = formAcquisitionType === AcquisitionTypeEnum.RENT

		uniqueServices.forEach((service: Service) => {
			const serviceId = service.id || service.serviceId
			if (serviceId && !serviceMap.has(serviceId)) {
				// Check if service is default for this acquisition type
				const isDefault = isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy
				// Service exists in products but not in form - add it
				// Default services should be included, others should not
				updatedServices.push({
					serviceId: serviceId,
					isIncluded: isDefault || false,
					quantity: 0,
					price: 0
				})
				needsUpdate = true
			}
		})

		if (needsUpdate) {
			form.setValue('services', updatedServices, { shouldValidate: false, shouldDirty: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uniqueServices, isEditMode, formAcquisitionType])

	return (
		<FormItems summary={totalAmountLabel} openCancelDialog={cancelDialog?.toggleOpened}>
			{products && products.length > 0 && (
				<Box style={{ gridColumn: 'span 2' }} paddingBottom={2}>
					<Text fontSize="big" color="neutral.900" fontWeight="semibold">
						{t('General.products')}
					</Text>
				</Box>
			)}
			{products?.map((product: Product, index: number) => (
				<OrderProductCard key={product.id} product={product} index={index} />
			))}
			<Box style={{ gridColumn: 'span 2' }}>
				<Stack gap={0}>
					<Divider />
					{hasServices && (
						<Box paddingTop={4} paddingBottom={2}>
							<Text fontSize="big" color="neutral.900" fontWeight="semibold">
								{t('General.services')}
							</Text>
						</Box>
					)}
					{hasServices && (
						<Box style={{ gridColumn: 'span 2' }}>
							<Stack gap={0}>
								{uniqueServices.map((service: Service) => {
									const serviceId = service.id || service.serviceId
									const serviceIndex = formServices.findIndex((fs: any) => fs.serviceId === serviceId)
									if (serviceIndex < 0) return null

									return (
										<ServiceListItem
											key={serviceId}
											service={service}
											serviceIndex={serviceIndex}
											products={products}
											acquisitionType={formAcquisitionType}
											orderStatus={orderStatus}
											isEditMode={isEditMode}
										/>
									)
								})}
							</Stack>
						</Box>
					)}
					{visibleAdditionalCosts && visibleAdditionalCosts.length > 0 && (
						<Box paddingTop={hasServices ? 4 : 4} paddingBottom={2}>
							<Text fontSize="big" color="neutral.900" fontWeight="semibold">
								{t('General.additionalCosts')}
							</Text>
						</Box>
					)}
					{hasAfterPaymentMethod && !isEditMode && (
						<Box paddingTop={visibleAdditionalCosts && visibleAdditionalCosts.length > 0 ? 0 : 4} paddingBottom={2}>
							<Text fontSize="big" color="neutral.900" fontWeight="semibold">
								{t('Orders.additionalCostsAfterPaymentDescription')}
							</Text>
						</Box>
					)}
					<Box style={{ gridColumn: 'span 2' }}>
						<Stack gap={0}>
							{visibleAdditionalCosts?.map((additionalCost: AdditionalCosts, index: number) => {
								// Find the original index in the full additionalCosts array for form field mapping
								const originalIndex = additionalCosts?.findIndex(ac => ac.id === additionalCost.id) ?? index
								return (
									<AdditionalCostListItem
										key={additionalCost.id}
										additionalCost={additionalCost}
										index={originalIndex}
										isEditMode={isEditMode}
										orderStatus={orderStatus}
									/>
								)
							})}
						</Stack>
					</Box>
				</Stack>
			</Box>
			<FormControl name="customerId">
				<FormControl.Label>
					<RequiredLabel>{t('General.client')}</RequiredLabel>
				</FormControl.Label>
				<SearchDropdown options={customers} placeholder={t('General.client')} alwaysShowSearch={true} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="eventId">
				<FormControl.Label>{t('General.event')}</FormControl.Label>
				<SearchDropdown
					options={events}
					placeholder={t('General.event')}
					disabled={!customerId}
					alwaysShowSearch={true}
				/>
				<FormControl.Message />
			</FormControl>
			<FormControl name="location">
				<FormControl.Label>{t('General.location')}</FormControl.Label>
				<TextInput placeholder={t('General.locationPlaceholder')} autoComplete="off" />
				<FormControl.Message />
			</FormControl>
			<FormControl name="place">
				<FormControl.Label>
					<RequiredLabel>{t('General.placeAndPostalCode')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.placeAndPostalCodePlaceholder')} autoComplete="off" />
				<FormControl.Message />
			</FormControl>
			<FormControl name="street">
				<FormControl.Label>
					<RequiredLabel>{t('General.streetAndNumber')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.streetAndNumberPlaceholder')} autoComplete="off" />
				<FormControl.Message />
			</FormControl>
			<div />
			<FormControl name="contactPerson">
				<FormControl.Label>{t('Orders.contactPerson')}</FormControl.Label>
				<TextInput placeholder={t('Orders.contactPersonPlaceholder')} autoComplete="off" />
				<FormControl.Message />
			</FormControl>
			<FormControl name="contactPersonContact">
				<FormControl.Label>{t('Orders.contactPersonContact')}</FormControl.Label>
				<TextInput placeholder={t('Orders.contactPersonContactPlaceholder')} autoComplete="off" />
				<FormControl.Message />
			</FormControl>
			<FormControl name="notes" maxLength="500">
				<FormControl.Label>{t('General.notes')}</FormControl.Label>
				<Textarea placeholder={t('Orders.notesPlaceholder')} rows={4} />
				<FormControl.Message />
			</FormControl>
		</FormItems>
	)
}
