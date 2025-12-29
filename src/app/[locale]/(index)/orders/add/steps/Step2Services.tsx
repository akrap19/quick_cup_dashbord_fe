'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useMemo, useCallback, useRef } from 'react'

import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { ServiceListItem } from '@/components/custom/service-card'
import { Product } from 'api/models/products/product'
import { Service } from 'api/models/services/service'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { useOrderWizardStore, Step2ServicesData } from '@/store/order-wizard'
import { getServicePrices } from 'api/services/services'
import { useBuyStore } from '@/store/buy'
import { useRentStore } from '@/store/rent'
import { Base } from 'api/models/common/base'

const step2Schema = z.object({
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
	serviceLocations?: Base[]
}

export const Step2Services = ({ products, acquisitionType, serviceLocations = [] }: Props) => {
	const t = useTranslations()
	const { step2Data, setStep2Data, setTotalAmount, step1Data } = useOrderWizardStore()
	const buyStore = useBuyStore()
	const rentStore = useRentStore()
	const isRent = acquisitionType === AcquisitionTypeEnum.RENT
	const { selectedItems } = isRent ? rentStore : buyStore

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

	// Initialize services
	const initialServices = useMemo(() => {
		if (step2Data?.services) {
			return step2Data.services
		}

		const serviceMap = new Map<
			string,
			{ serviceId: string; isIncluded: boolean; quantity: number; price: number; serviceLocationId?: string }
		>()

		selectedItems.forEach((product: Product) => {
			if (product.servicePrices && product.servicePrices.length > 0) {
				product.servicePrices.forEach(service => {
					const serviceId = service.id || service.serviceId
					if (serviceId && !serviceMap.has(serviceId)) {
						const isDefault = isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy

						serviceMap.set(serviceId, {
							serviceId: serviceId,
							isIncluded: isDefault || false,
							quantity: 0,
							price: 0,
							serviceLocationId: undefined
						})
					}
				})
			}
		})

		return Array.from(serviceMap.values())
	}, [selectedItems, isRent, step2Data])

	const form = useForm<Step2Schema>({
		mode: 'onChange',
		resolver: zodResolver(step2Schema),
		defaultValues: {
			services: initialServices
		}
	})

	const formServices = useWatch({ control: form.control, name: 'services' }) || []

	// Calculate service prices
	const calculateServicePrices = useCallback(async () => {
		if (!step1Data?.products) return

		const productsWithQuantity = step1Data.products.filter(p => Number(p.quantity) > 0)

		for (const formService of formServices) {
			const serviceId = formService.serviceId
			if (!serviceId) continue

			const productsForCalculation = productsWithQuantity.map(p => ({
				productId: p.productId,
				quantity: p.quantity
			}))

			if (productsForCalculation.length === 0) {
				const serviceIndex = formServices.findIndex(s => s.serviceId === serviceId)
				if (serviceIndex >= 0) {
					form.setValue(`services.${serviceIndex}.price`, 0, { shouldValidate: false, shouldDirty: false })
					form.setValue(`services.${serviceIndex}.quantity`, 0, { shouldValidate: false, shouldDirty: false })
				}
				continue
			}

			try {
				const response = await getServicePrices(serviceId, {
					products: productsForCalculation,
					acquisitionType
				})

				if (response) {
					const calculatedPrice = Number.parseFloat((response.totalPrice || 0).toFixed(3))
					const serviceIndex = formServices.findIndex(s => s.serviceId === serviceId)
					if (serviceIndex >= 0) {
						const currentPrice = form.getValues(`services.${serviceIndex}.price`)
						if (currentPrice !== calculatedPrice) {
							form.setValue(`services.${serviceIndex}.price`, calculatedPrice, {
								shouldValidate: false,
								shouldDirty: false
							})
						}

						const totalQuantity = productsForCalculation.reduce((sum, p) => sum + p.quantity, 0)
						form.setValue(`services.${serviceIndex}.quantity`, totalQuantity, {
							shouldValidate: false,
							shouldDirty: false
						})
					}
				}
			} catch (error) {
				const serviceIndex = formServices.findIndex(s => s.serviceId === serviceId)
				if (serviceIndex >= 0) {
					form.setValue(`services.${serviceIndex}.price`, 0, { shouldValidate: false, shouldDirty: false })
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formServices.map(s => s.serviceId).join(','), step1Data?.products, acquisitionType])

	const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		if (debounceTimeoutRef.current) {
			clearTimeout(debounceTimeoutRef.current)
		}

		debounceTimeoutRef.current = setTimeout(() => {
			calculateServicePrices()
		}, 300)

		return () => {
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current)
			}
		}
	}, [calculateServicePrices])

	// Save to store and calculate total when form changes
	useEffect(() => {
		const subscription = form.watch(data => {
			const servicesTotal = (data.services || []).reduce((sum, formService) => {
				if (!formService) return sum
				let isDefault = false
				selectedItems.forEach((product: Product) => {
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
				services: (data.services || [])
					.filter((s): s is NonNullable<typeof s> => s !== undefined)
					.filter(
						(
							s
						): s is {
							serviceId: string
							isIncluded: boolean
							quantity: number
							price: number
							productQuantities?: Record<string, number>
							serviceLocationId?: string
						} =>
							!!s.serviceId &&
							typeof s.isIncluded === 'boolean' &&
							typeof s.quantity === 'number' &&
							typeof s.price === 'number'
					)
			}
			setStep2Data(stepData)

			// Update total amount (will be combined with other steps in parent)
			const step1Total = step1Data?.products?.reduce((sum, p) => sum + (p.price || 0), 0) || 0
			setTotalAmount(step1Total + servicesTotal)
		})

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch, selectedItems, isRent, step1Data])

	const hasServices = uniqueServices.length > 0

	const hasDefaultService = useMemo(() => {
		return uniqueServices.some((service: Service) => {
			return isRent ? service.isDefaultServiceForRent : service.isDefaultServiceForBuy
		})
	}, [uniqueServices, isRent])

	return (
		<FormProvider {...form}>
			<Stack gap={3}>
				{hasDefaultService && (
					<Text fontSize="small" color="destructive.500">
						{t('General.requiredServicesWarning')}
					</Text>
				)}
				{hasServices && (
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
									acquisitionType={acquisitionType}
									isEditMode={false}
									serviceLocations={serviceLocations}
								/>
							)
						})}
					</Stack>
				)}
			</Stack>
		</FormProvider>
	)
}
