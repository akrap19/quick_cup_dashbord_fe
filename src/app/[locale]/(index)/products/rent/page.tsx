import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { getProducts, getMyProducts } from 'api/services/products'
import { ROUTES } from 'parameters'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { UserRoleEnum } from 'enums/userRoleEnum'

import { Inputs } from './inputs'
import { ShopItemCard } from '@/components/custom/shop-item-card/ShopItemCard'
import { Product } from 'api/models/products/product'
import { Inline } from '@/components/layout/inline'
import { UpdateProductStatesModal } from '@/components/custom/update-product-states-modal'
import { getServiceLocationsOptions } from 'api/services/services'
import { getClients } from 'api/services/clients'
import { Stack } from '@/components/layout/stack'
import { SectionTitle } from './SectionTitle'

interface Props {
	searchParams: {
		search: string
		page: number
		limit: number
	}
}

const RentPage = async ({ searchParams }: Props) => {
	const { data: rentData } = await getProducts({ ...searchParams, acquisitionType: AcquisitionTypeEnum.RENT })
	const session = await getServerSession(authOptions)
	const userRole = session?.user?.roles[0]?.name
	const isClient = userRole === UserRoleEnum.CLIENT

	const myProductsData = isClient ? await getMyProducts() : null
	const { data: users } = await getClients({ search: undefined, page: 1, limit: 300 })
	const transformedUsers = users?.users?.map((user: any) => {
		return {
			id: user.userId,
			name: user.companyName
		}
	})
	const serviceLocationsData = await getServiceLocationsOptions()
	const isInitialListEmpty = (rentData?.pagination?.count === 0 && !searchParams.search) || rentData === null
	const transformedRentArray = rentData?.products?.map((rent: any) => {
		return {
			...rent,
			id: rent.id,
			name: rent.name ?? '-',
			description: rent.description ?? '-',
			images: rent.images?.map((image: any) => image.url) ?? []
		}
	})

	const transformedMyProductsArray =
		myProductsData?.products?.map((product: any) => {
			return {
				...product,
				id: product.id,
				name: product.name ?? '-',
				description: product.description ?? '-',
				images: product.images?.map((image: any) => image.url) ?? []
			}
		}) ?? []

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.rent"
			title="Rent.noListDataTitle"
			description="Rent.noListDataDescription"
			buttonLabel="Rent.add"
			buttonLink={ROUTES.ADD_RENT}
		/>
	) : (
		<ListWrapper title="General.rent">
			<Inputs />
			<Stack gap={7}>
				{transformedRentArray && transformedRentArray.length > 0 && (
					<Inline gap={6}>
						{transformedRentArray.map((product: Product) => (
							<ShopItemCard key={product.id} shopItem={product} route={ROUTES.RENT} editRoute={ROUTES.EDIT_RENT} />
						))}
					</Inline>
				)}
				{isClient && transformedMyProductsArray && transformedMyProductsArray.length > 0 && (
					<Stack gap={4}>
						<SectionTitle translationKey="Rent.myProducts" />
						<Inline gap={6}>
							{transformedMyProductsArray.map((product: Product) => (
								<ShopItemCard
									key={product.id}
									shopItem={product}
									route={ROUTES.RENT}
									editRoute={ROUTES.EDIT_RENT}
									allowClientEdit={true}
								/>
							))}
						</Inline>
					</Stack>
				)}
			</Stack>
			<UpdateProductStatesModal users={transformedUsers} serviceLocations={serviceLocationsData} />
		</ListWrapper>
	)
}

export default RentPage
