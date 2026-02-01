import { getClients } from 'api/services/clients'
import { OrderAddWizard } from './OrderAddWizard'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { getEvents } from 'api/services/events'
import { getAdditionalCosts } from 'api/services/additionalCosts'
import { getProducts, getMyProducts } from 'api/services/products'
import { getServiceLocationsOptions } from 'api/services/services'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { UserRoleEnum } from 'enums/userRoleEnum'
import { hasRoleAccess } from 'utils/hasRoleAccess'
import { Base } from 'api/models/common/base'

interface Props {
	searchParams: {
		acquisitionType: AcquisitionTypeEnum
		searchClients: string
		searchEvents: string
		searchAdditionalCosts: string
	}
}

const Page = async ({ searchParams }: Props) => {
	const { data: clientsData } = await getClients({ search: searchParams.searchClients })
	const { data: eventsData } = await getEvents({ search: searchParams.searchEvents })
	const { data: additionalCostsData } = await getAdditionalCosts({
		acquisitionType: searchParams.acquisitionType,
		search: searchParams.searchAdditionalCosts
	})
	const { data: productsData } = await getProducts({
		acquisitionType: searchParams.acquisitionType,
		limit: 100,
		page: 1
	})

	const transformedClientArray =
		clientsData?.users?.map((client: any) => {
			return {
				...client,
				id: client.userId,
				name: client.companyName
			}
		}) || []
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

	const session = await getServerSession(authOptions)
	const userRole = session?.user?.roles[0]?.name
	const isAdmin = await hasRoleAccess(userRole, [UserRoleEnum.ADMIN, UserRoleEnum.MASTER_ADMIN])
	const isClient = userRole === UserRoleEnum.CLIENT
	const isRent = searchParams.acquisitionType === AcquisitionTypeEnum.RENT

	// Fetch My products only for clients and rent orders
	const myProductsData = isClient && isRent ? await getMyProducts() : null
	const transformedMyProductsArray =
		myProductsData?.products?.map((product: any) => {
			return {
				...product,
				id: product.id,
				name: product.name ?? '-',
				description: product.description ?? '-',
				images: product.images?.map((image: any) => image.url) ?? []
			}
		}) || []

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
		<OrderAddWizard
			isAdmin={isAdmin}
			acquisitionType={searchParams.acquisitionType}
			clients={transformedClientArray}
			events={eventsData?.events}
			additionalCosts={additionalCostsData?.additionalCosts}
			allProducts={transformedProductsArray}
			myProducts={transformedMyProductsArray}
			serviceLocations={serviceLocations}
		/>
	)
}

export default Page
