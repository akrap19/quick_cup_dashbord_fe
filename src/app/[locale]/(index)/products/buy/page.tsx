import { ListWrapper } from '@/components/custom/layouts'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { getProducts } from 'api/services/products'
import { ROUTES } from 'parameters'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

import { Inputs } from './inputs'
import { ShopItemCard } from '@/components/custom/shop-item-card/ShopItemCard'
import { Product } from 'api/models/products/product'
import { Inline } from '@/components/layout/inline'
import { UpdateProductStatesModal } from '@/components/custom/update-product-states-modal'
import { getClients } from 'api/services/clients'
import { getServiceLocationsOptions } from 'api/services/services'

interface Props {
	searchParams: {
		search: string
		page: number
		limit: number
	}
}

const BuyPage = async ({ searchParams }: Props) => {
	const { data: buyData } = await getProducts({ ...searchParams, acquisitionType: AcquisitionTypeEnum.BUY })
	const { data: users } = await getClients({ search: undefined, page: 1, limit: 300 })
	const transformedUsers = users?.users?.map((user: any) => {
		return {
			id: user.userId,
			name: user.companyName
		}
	})
	const serviceLocationsData = await getServiceLocationsOptions()

	const isInitialListEmpty = (buyData?.pagination?.count === 0 && !searchParams.search) || buyData === null
	const transformedBuyArray = buyData?.products?.map((buy: any) => {
		return {
			...buy,
			id: buy.id,
			name: buy.name ?? '-',
			description: buy.description ?? '-',
			images: buy.images?.map((image: any) => image.url) ?? []
		}
	})

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.buy"
			title="Buy.noListDataTitle"
			description="Buy.noListDataDescription"
			buttonLabel="Buy.add"
			buttonLink={ROUTES.ADD_BUY}
		/>
	) : (
		<ListWrapper title="General.buy">
			<Inputs />
			<Inline gap={6}>
				{transformedBuyArray?.map((product: Product) => (
					<ShopItemCard key={product.id} shopItem={product} route={ROUTES.BUY} editRoute={ROUTES.EDIT_BUY} />
				))}
			</Inline>
			<UpdateProductStatesModal users={transformedUsers} serviceLocations={serviceLocationsData} />
		</ListWrapper>
	)
}

export default BuyPage
