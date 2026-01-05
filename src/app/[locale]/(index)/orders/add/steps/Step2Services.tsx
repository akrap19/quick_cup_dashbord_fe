'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useMemo } from 'react'

import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { ServiceListItem } from '@/components/custom/service-card'
import { Product } from 'api/models/products/product'
import { Service } from 'api/models/services/service'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { useOrderWizardStore, Step2ServicesData } from '@/store/order-wizard'
import { Base } from 'api/models/common/base'
import { NoResult } from '@/components/custom/no-result'
import { Order } from 'api/models/order/order'

const step2Schema = z.object({
	products: z
		.array(
			z.object({
				productId: z.string(),
				quantity: z.coerce.number().min(0),
				price: z.coerce.number().min(0)
			})
		)
		.optional()
		.default([]),
	services: z
		.array(
			z.object({
				serviceId: z.string(),
				isIncluded: z.boolean().default(false),
				quantity: z.coerce.number().min(0),
				price: z.coerce.number().min(0),
				productQuantities: z.record(z.string(), z.coerce.number().min(0)).optional(),
				serviceLocationId: z.string().optional()
			})
		)
		.optional()
		.default([])
})

type Step2Schema = z.infer<typeof step2Schema>

interface Props {
	products: Product[]
	acquisitionType: AcquisitionTypeEnum
	order?: Order
	serviceLocations?: Base[]
}

export const Step2Services = ({ products, acquisitionType, order, serviceLocations = [] }: Props) => {
	const t = useTranslations()
	const { getStep2Data, getStep1Data, setStep2Data, setTotalAmount } = useOrderWizardStore()
	const step2Data = getStep2Data(acquisitionType)
	const step1Data = getStep1Data(acquisitionType)
	const isRent = acquisitionType === AcquisitionTypeEnum.RENT

	// Collect unique services from all products (use products prop which is selectedItems from parent)
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

	// Get products from step1Data for the form (ServiceListItem needs this)
	const formProducts = useMemo(() => {
		return step1Data?.products || []
	}, [step1Data?.products])

	// Initialize services based on uniqueServices to ensure consistency
	const initialServices = useMemo(() => {
		// If we have saved data, try to merge it with current services
		if (step2Data?.services && step2Data.services.length > 0) {
			const savedServicesMap = new Map(step2Data.services.map(s => [s.serviceId, s]))

			// Build services array from uniqueServices, preserving saved data where available
			return uniqueServices.map(service => {
				const serviceId = service.id || service.serviceId
				const savedService = savedServicesMap.get(serviceId)

				if (savedService) {
					// Preserve saved data
					return {
						serviceId: serviceId,
						isIncluded: savedService.isIncluded,
						quantity: savedService.quantity,
						price: savedService.price,
						productQuantities: savedService.productQuantities,
						serviceLocationId: savedService.serviceLocationId
					}
				}

				// New service - initialize with defaults
				const isDefault = isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy
				return {
					serviceId: serviceId,
					isIncluded: isDefault || false,
					quantity: 0,
					price: 0,
					serviceLocationId: undefined
				}
			})
		}

		// No saved data - initialize all services from uniqueServices
		return uniqueServices.map(service => {
			const serviceId = service.id || service.serviceId
			const isDefault = isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy

			return {
				serviceId: serviceId,
				isIncluded: isDefault || false,
				quantity: 0,
				price: 0,
				serviceLocationId: undefined
			}
		})
	}, [uniqueServices, isRent, step2Data])

	const form = useForm<Step2Schema>({
		mode: 'onChange',
		resolver: zodResolver(step2Schema),
		defaultValues: {
			products: formProducts,
			services: initialServices
		}
	})

	// Reset form when initialServices or formProducts change (e.g., when navigating back or products change)
	useEffect(() => {
		form.reset({
			products: formProducts,
			services: initialServices
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		uniqueServices.map(s => s.id || s.serviceId).join(','),
		formProducts.map(p => `${p.productId}-${p.quantity}`).join(',')
	])

	const formServices = useWatch({ control: form.control, name: 'services' }) || []

	useEffect(() => {
		const subscription = form.watch(data => {
			const servicesTotal = (data.services || []).reduce((sum, formService) => {
				if (!formService) return sum

				// Find if this service is default
				let isDefault = false
				products.forEach((product: Product) => {
					if (product.servicePrices && product.servicePrices.length > 0) {
						const service = product.servicePrices.find(
							s => (s.id && s.id === formService.serviceId) || (s.serviceId && s.serviceId === formService.serviceId)
						)
						if (service) {
							isDefault = isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy

							if (isDefault) return
						}
					}
				})

				return sum + (formService.isIncluded || isDefault ? formService.price || 0 : 0)
			}, 0)

			const stepData: Step2ServicesData = {
				services: (data.services || []).filter(
					(s): s is NonNullable<typeof s> => s !== undefined
				) as Step2ServicesData['services']
			}

			setStep2Data(stepData, acquisitionType)

			// Update total amount (will be combined with other steps in parent)
			const step1Total = step1Data?.products?.reduce((sum, p) => sum + (p.price || 0), 0) || 0
			setTotalAmount(step1Total + servicesTotal, acquisitionType)
		})

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch, products, isRent, step1Data, acquisitionType])

	const hasServices = uniqueServices.length > 0

	const hasDefaultService = useMemo(() => {
		return uniqueServices.some((service: Service) => {
			return isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy
		})
	}, [uniqueServices, isRent])

	return (
		<FormProvider {...form}>
			{hasServices ? (
				<Stack gap={3}>
					{hasDefaultService && (
						<Text fontSize="small" color="destructive.500">
							{t('General.requiredServicesWarning')}
						</Text>
					)}

					<Stack gap={0}>
						{uniqueServices.map((service: Service) => {
							const serviceId = service.id || service.serviceId
							const serviceIndex = formServices.findIndex((fs: any) => fs?.serviceId === serviceId)

							// Ensure service exists in form, if not add it
							if (serviceIndex < 0) {
								// This shouldn't happen, but if it does, add the service
								const isDefault = isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy
								const currentServices = form.getValues('services') || []
								form.setValue(
									'services',
									[
										...currentServices,
										{
											serviceId: serviceId,
											isIncluded: isDefault || false,
											quantity: 0,
											price: 0,
											serviceLocationId: undefined
										}
									],
									{ shouldValidate: false }
								)
								return null
							}

							return (
								<ServiceListItem
									key={serviceId}
									service={service}
									serviceIndex={serviceIndex}
									products={products}
									order={order}
									acquisitionType={acquisitionType}
									serviceLocations={serviceLocations}
								/>
							)
						})}
					</Stack>
				</Stack>
			) : (
				<NoResult size="large" noResoultMessage="General.noAvailableProducts" />
			)}
		</FormProvider>
	)
}
