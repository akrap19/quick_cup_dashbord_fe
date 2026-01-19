import { getOrder } from 'api/services/orders'
import { getClients } from 'api/services/clients'
import { getEvents } from 'api/services/events'
import { getAdditionalCosts } from 'api/services/additionalCosts'
import { getProducts } from 'api/services/products'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { getServiceLocationsOptions } from 'api/services/services'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { UserRoleEnum } from 'enums/userRoleEnum'
import { hasRoleAccess } from 'utils/hasRoleAccess'
import { Base } from 'api/models/common/base'

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
				name: client.companyName
			}
		}) || []

	if (!order?.customerId && (order as any)?.firstName && (order as any)?.lastName) {
		const orderCustomer = {
			id: (order as any).firstName + ' ' + (order as any).lastName,
			name: (order as any).firstName + ' ' + (order as any).lastName
		}

		transformedClientArray.push(orderCustomer)
	}

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
	const isAdmin = await hasRoleAccess(userRole, [UserRoleEnum.ADMIN, UserRoleEnum.MASTER_ADMIN])

	let serviceLocations: Base[] = []
	if (isAdmin) {
		try {
			const data = await getServiceLocationsOptions()
			serviceLocations =
				data?.map((loc: Base) => ({
					id: loc.id || '',
					name: loc?.name
				})) || []
		} catch (error) {
			console.error('Error fetching service locations:', error)
		}
	}

	return (
		<OrderEditWizard
			isAdmin={isAdmin}
			order={order}
			acquisitionType={order?.acquisitionType || AcquisitionTypeEnum.BUY}
			clients={transformedClientArray}
			events={eventsData?.events}
			additionalCosts={additionalCostsData?.additionalCosts || []}
			allProducts={transformedProductsArray}
			serviceLocations={serviceLocations}
		/>
	)
}

export default OrderEditPage
