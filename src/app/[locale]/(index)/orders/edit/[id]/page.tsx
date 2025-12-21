import { getOrder } from 'api/services/orders'
import { getClients } from 'api/services/clients'
import { getEvents } from 'api/services/events'
import { getAdditionalCosts } from 'api/services/additionalCosts'
import { getProduct } from 'api/services/products'
import { Product } from 'api/models/products/product'

import OrderEdit from './OrderEdit'

interface Props {
	params: {
		id: string
	}
	searchParams: {
		searchClients: string
		searchEvents: string
		searchAdditionalCosts: string
	}
}

const OrderEditPage = async ({ params, searchParams }: Props) => {
	const { data: order } = await getOrder(params.id)
	const { data: clientsData } = await getClients({ search: searchParams.searchClients })
	const { data: eventsData } = await getEvents({ search: searchParams.searchEvents })
	const { data: additionalCostsData } = await getAdditionalCosts({
		acquisitionType: order?.acquisitionType,
		search: searchParams.searchAdditionalCosts
	})
	const transformedClientArray =
		clientsData?.users?.map((client: any) => {
			return {
				...client,
				id: client.userId,
				name: client.name
			}
		}) || []

	if (!order?.customerId && (order as any)?.firstName && (order as any)?.lastName) {
		const orderCustomer = {
			id: (order as any).firstName + ' ' + (order as any).lastName,
			name: (order as any).firstName + ' ' + (order as any).lastName
		}

		transformedClientArray.push(orderCustomer)
	}

	const transformedEventArray =
		eventsData?.events?.map((event: any) => {
			return {
				...event,
				id: event.id,
				name: event.title
			}
		}) || []

	// Collect all unique service definitions from order.services
	const serviceDefinitionsMap = new Map()
	if (order?.services) {
		order.services.forEach((orderService: any) => {
			if (orderService.service && orderService.serviceId) {
				serviceDefinitionsMap.set(orderService.serviceId, orderService.service)
			}
		})
	}

	// Fetch full product data for each product to get all servicePrices
	const productsWithFullData = await Promise.all(
		(order?.products || [])
			.filter((orderProduct: any) => orderProduct.product && orderProduct.productId)
			.map(async (orderProduct: any) => {
				try {
					// Fetch full product data to get all servicePrices
					const { data: fullProduct } = await getProduct(orderProduct.productId)
					return fullProduct || orderProduct.product
				} catch (error) {
					// If fetch fails, use the product from order
					return orderProduct.product
				}
			})
	)

	const transformedProductsArray: Product[] = productsWithFullData.map((product: any) => {
		// Get existing servicePrices from full product data (should have all services)
		let servicePrices = product.servicePrices ?? []

		// Merge: add any services from order that aren't already in servicePrices, and update existing ones
		if (servicePrices.length > 0) {
			const existingServiceIds = new Set(servicePrices.map((s: any) => s.id || s.serviceId))
			// Update existing services with service definitions from order (to ensure we have latest default flags)
			servicePrices = servicePrices.map((service: any) => {
				const serviceId = service.id || service.serviceId
				const orderServiceDef = serviceDefinitionsMap.get(serviceId)
				// If service exists in order, merge properties (preserve order service definition which has correct flags)
				if (orderServiceDef) {
					return { ...service, ...orderServiceDef }
				}
				return service
			})
			// Add any services from order that aren't already in servicePrices
			serviceDefinitionsMap.forEach((serviceDef, serviceId) => {
				if (!existingServiceIds.has(serviceId)) {
					servicePrices.push(serviceDef)
				}
			})
		} else if (serviceDefinitionsMap.size > 0) {
			// If no servicePrices, add from order.services
			servicePrices = Array.from(serviceDefinitionsMap.values())
		}

		return {
			...product,
			id: product.id,
			name: product.name ?? '-',
			description: product.description ?? '-',
			images: product.images?.map((image: any) => image.url) ?? [],
			servicePrices: servicePrices,
			prices: product.prices ?? [],
			size: product.size ?? '',
			unit: product.unit ?? '',
			quantityPerUnit: product.quantityPerUnit ?? 0,
			transportationUnit: product.transportationUnit ?? '',
			unitsPerTransportationUnit: product.unitsPerTransportationUnit ?? 0,
			acquisitionType: product.acquisitionType ?? order?.acquisitionType
		} as Product
	})

	return (
		<OrderEdit
			order={order}
			clients={transformedClientArray}
			events={transformedEventArray}
			products={transformedProductsArray}
			additionalCosts={additionalCostsData?.additionalCosts || []}
		/>
	)
}

export default OrderEditPage
