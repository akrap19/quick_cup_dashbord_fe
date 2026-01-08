'use client'

import { Text } from '@/components/typography/text'
import { Stack } from '@/components/layout/stack'
import Image from 'next/image'
import { shopItemCardContainer, shopItemCardImageContainer } from './ShopItemCard.css'
import { Box } from '@/components/layout/box'
import { Divider } from '@/components/layout/divider'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/inputs/button'
import { Product } from 'api/models/products/product'
import { ItemCarousel } from '../item-carousel/ItemCarousel'
import { PencilIcon } from '@/components/icons/pencil-icon'
import { useRouter } from 'next/navigation'
import { TrashIcon } from '@/components/icons/trash-icon'
import { useOpened } from '@/hooks/use-toggle'
import { ConfirmActionDialog } from '@/components/overlay/confirm-action-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { deleteProduct } from 'api/services/products'
import { PlainPlusIcon } from '@/components/icons/plain-plus-icon'
import { useBuyStore } from '@/store/buy'
import { useRentStore } from '@/store/rent'
import { MinusIcon } from '@/components/icons/minus-icon'
import { ROUTES } from 'parameters'
import { useHasRoleAccess } from '@/hooks/use-has-role-access'
import { UserRoleEnum } from 'enums/userRoleEnum'

interface Props {
	shopItem: Product
	route: string
	editRoute: string
}

export const ShopItemCard = ({ shopItem, route, editRoute }: Props) => {
	const t = useTranslations()
	const confirmDialog = useOpened()
	const router = useRouter()
	const isRentRoute = route === ROUTES.RENT
	const buyStore = useBuyStore()
	const rentStore = useRentStore()
	const { selectedItems, addItem, removeItem } = isRentRoute ? rentStore : buyStore
	const isItemAlreadyInCart = selectedItems.find(item => item.id === shopItem.id)

	const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()

		router.push(editRoute + shopItem.id.toString())
	}

	const handleConfirmDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()

		confirmDialog.toggleOpened()
	}

	const handleDelete = async () => {
		const result = await deleteProduct(shopItem.id)

		if (result?.message === 'OK') {
			SuccessToast(t('Buy.successfullyDeleted'))

			buyStore.removeItem(shopItem.id)
			rentStore.removeItem(shopItem.id)

			confirmDialog.toggleOpened()
			router.refresh()
		}
	}

	const handleAddProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()

		if (isItemAlreadyInCart) {
			removeItem(shopItem.id)
		} else {
			addItem(shopItem)
		}
	}

	return (
		<>
			<Button variant="adaptive" size="auto" href={`${route}/${shopItem.id}`} style={{ width: 'auto' }}>
				<Box className={shopItemCardContainer}>
					<Stack gap={1}>
						<Box width="100%" position="relative">
							<Stack gap={2}>
								<Box position="absolute" style={{ top: 0, right: 0, zIndex: 1 }}>
									<Button
										variant={isItemAlreadyInCart ? 'destructive' : 'success'}
										size="icon"
										onClick={handleAddProduct}>
										{isItemAlreadyInCart ? (
											<MinusIcon size="small" color="shades.00" />
										) : (
											<PlainPlusIcon size="small" color="shades.00" />
										)}
									</Button>
								</Box>
								{useHasRoleAccess([UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN]) && (
									<Box position="absolute" style={{ top: '65%', right: 0, zIndex: 1 }}>
										<Stack gap={2}>
											<Button variant="warning" size="icon" onClick={handleEdit}>
												<PencilIcon size="small" color="shades.00" />
											</Button>
											<Button variant="destructive" size="icon" onClick={handleConfirmDialog}>
												<TrashIcon size="small" color="shades.00" />
											</Button>
										</Stack>
									</Box>
								)}
								<ItemCarousel>
									{(shopItem?.images && shopItem.images.length > 0
										? shopItem.images
										: ['/images/no_image_placeholder.png']
									).map((item: any) => (
										<div key={item} className={shopItemCardImageContainer}>
											<Image alt="quick cup image" src={item} fill objectFit="contain" priority />
										</div>
									))}
								</ItemCarousel>
								<Stack gap={1}>
									<Divider backgroundColor="neutral.100" />
									<Stack justifyContent="flex-start">
										<Stack>
											<Text fontSize="medium" textAlign="left" fontWeight="semibold" color="neutral.800">
												{t(shopItem.name)}
											</Text>
											{/* {shopItem.isCustomizable && (
												<Text fontSize="medium" textAlign="left" fontWeight="semibold" className={rainbowText}>
													{t('EventCups.customizable')}
												</Text>
											)} */}
										</Stack>
										<Box style={{ width: '100%', height: '4px' }} />

										{/* <Text textAlign="left" color="neutral.500">
							{shopItem.price}
						</Text> */}
									</Stack>
								</Stack>
							</Stack>
						</Box>
					</Stack>
				</Box>
			</Button>
			<ConfirmActionDialog
				title="Buy.delete"
				description="Buy.deleteDescription"
				buttonLabel="General.delete"
				confirmDialog={confirmDialog}
				onSubmit={handleDelete}
			/>
		</>
	)
}
