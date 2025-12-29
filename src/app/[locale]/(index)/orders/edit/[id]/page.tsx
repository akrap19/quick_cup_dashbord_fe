import { getOrder } from 'api/services/orders'
import { getClients } from 'api/services/clients'
import { getEvents } from 'api/services/events'
import { getAdditionalCosts } from 'api/services/additionalCosts'
import { getProducts } from 'api/services/products'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { getServiceLocations } from 'api/services/serviceLocations'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { UserRoleEnum } from 'enums/userRoleEnum'
import { hasRoleAccess } from 'utils/hasRoleAccess'
import { Base } from 'api/models/common/base'
import { ServiceLocation } from 'api/models/service-locations/serviceLocation'

import { OrderEditWizard } from './OrderEditWizard'

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

	// Fetch all products for the acquisition type (like in add page)
	const { data: productsData } = await getProducts({
		acquisitionType: order?.acquisitionType || AcquisitionTypeEnum.BUY,
		limit: 100,
		page: 1
	})

	const transformedProductsArray =
		productsData?.products?.map((product: any) => {
			return {
				...product,
				id: product.id,
				name: product.name ?? '-',
				description: product.description ?? '-',
				images: product.images?.map((image: any) => image.url) ?? []
			}
		}) || []

	// Get user session to check role
	const session = await getServerSession(authOptions)
	const userRole = session?.user?.roles[0]?.name
	const isAdminOrMasterAdmin = hasRoleAccess(userRole, [UserRoleEnum.ADMIN, UserRoleEnum.MASTER_ADMIN])

	// Collect unique service IDs from products
	const uniqueServiceIds = new Set<string>()
	transformedProductsArray.forEach((product: any) => {
		if (product.servicePrices && product.servicePrices.length > 0) {
			product.servicePrices.forEach((service: any) => {
				const serviceId = service.id || service.serviceId
				if (serviceId) {
					uniqueServiceIds.add(serviceId)
				}
			})
		}
	})

	// Fetch service locations for all services (only if admin/master admin)
	let serviceLocations: Base[] = []
	if (isAdminOrMasterAdmin && uniqueServiceIds.size > 0) {
		try {
			const allLocations: Base[] = []
			await Promise.all(
				Array.from(uniqueServiceIds).map(async serviceId => {
					try {
						const response = await getServiceLocations({
							search: '',
							serviceId: serviceId,
							page: 1,
							limit: 100
						})

						if (response?.data?.serviceLocations) {
							const locations: Base[] = response.data.serviceLocations.map((loc: ServiceLocation) => ({
								id: loc.id || '',
								name: `${loc.city} - ${loc.address}`,
								serviceId: serviceId
							}))
							allLocations.push(...locations)
						}
					} catch (error) {
						console.error(`Error fetching service locations for service ${serviceId}:`, error)
					}
				})
			)
			serviceLocations = allLocations
		} catch (error) {
			console.error('Error fetching service locations:', error)
		}
	}

	return (
		<OrderEditWizard
			order={order}
			acquisitionType={order?.acquisitionType || AcquisitionTypeEnum.BUY}
			clients={transformedClientArray}
			events={transformedEventArray}
			additionalCosts={additionalCostsData?.additionalCosts || []}
			allProducts={transformedProductsArray}
			serviceLocations={serviceLocations}
		/>
	)
}

export default OrderEditPage
