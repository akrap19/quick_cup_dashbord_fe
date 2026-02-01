'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog } from '@/components/overlay/dialog'
import { Stack } from '@/components/layout/stack'
import { Box } from '@/components/layout/box'
import { Button } from '@/components/inputs/button'
import { Text } from '@/components/typography/text'
import { ProductStateFormTable } from '@/components/custom/product-state-form-table/ProductStateFormTable'
import { Product } from 'api/models/products/product'
import { ProductState } from 'api/models/products/productState'
import { Base } from 'api/models/common/base'
import { productStateSchema } from 'schemas'
import { bulkUpdateProductStates, getProduct } from 'api/services/products'
import { productStatesPayload } from 'api/models/products/productStatesPayload'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { ProductStateStatusEnum } from 'enums/productStateStatusEnum'
import { ProductStateLocationEnum } from 'enums/productStateLocationEnum'
import { Inline } from '@/components/layout/inline'
import { useBuyStore } from '@/store/buy'
import { useRentStore } from '@/store/rent'
import { ROUTES } from 'parameters'
import { usePathname, useRouter } from 'next/navigation'
import { useOpenedStore } from '@/store/opened'
import { tokens } from '@/style/theme.css'

const formSchema = z.object({
	products: z.array(
		z.object({
			productId: z.string(),
			productStates: z.array(productStateSchema)
		})
	)
})

type Schema = z.infer<typeof formSchema>

interface Props {
	users: Base[]
	serviceLocations: Base[]
}

export const UpdateProductStatesModal = ({ users, serviceLocations }: Props) => {
	const pathname = usePathname()
	const isRentRoute = pathname?.includes(ROUTES.RENT) || false
	const buyStore = useBuyStore()
	const rentStore = useRentStore()
	const { selectedItems, clearItems } = isRentRoute ? rentStore : buyStore
	const modalOpened = useOpenedStore()
	const opened = modalOpened.opened
	const onClose = modalOpened.toggleOpened
	const selectedProducts = selectedItems.length > 0 ? selectedItems : []
	const t = useTranslations()
	const [productsWithStates, setProductsWithStates] = useState<Product[]>(selectedProducts)
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	// Fetch full product data with states when modal opens
	useEffect(() => {
		if (opened && selectedProducts.length > 0) {
			setLoading(true)
			Promise.all(selectedProducts.map(product => getProduct(product.id)))
				.then(results => {
					const fetchedProducts = results
						.map(result => result?.data)
						.filter((product): product is Product => product !== undefined)
					setProductsWithStates(fetchedProducts.length > 0 ? fetchedProducts : selectedProducts)
				})
				.catch(error => {
					console.error('Error fetching product data:', error)
					setProductsWithStates(selectedProducts)
				})
				.finally(() => {
					setLoading(false)
				})
		} else if (opened && selectedProducts.length === 0) {
			// Reset when modal opens with no products
			setProductsWithStates([])
			setLoading(false)
		}
	}, [opened, selectedProducts])

	// Initialize form with product states
	const defaultValues = useMemo(() => {
		if (productsWithStates.length === 0) {
			return { products: [] }
		}
		return {
			products: productsWithStates.map(product => ({
				productId: product.id,
				productStates: product.productStates?.map(state => ({
					id: state.id,
					status: state.status,
					location: state.location,
					quantity: state.quantity,
					serviceLocationId: state.serviceLocationId || (state.serviceLocation as any)?.id || undefined,
					userId: state.userId || (state.user as any)?.userId || undefined
				})) || [{} as ProductState]
			}))
		}
	}, [productsWithStates])

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const handleSubmit = async () => {
		const data = form.getValues()

		try {
			// Transform data to bulk update payload format
			const updates: productStatesPayload[] = data.products.map(productData => {
				// Transform productStates to only include required fields with proper types
				const transformedProductStates: any = productData.productStates.map(state => ({
					status: state.status as ProductStateStatusEnum,
					location: state.location as ProductStateLocationEnum,
					quantity: state.quantity,
					serviceLocationId: state.serviceLocationId || undefined,
					userId: state.userId || undefined
				}))

				return {
					productId: productData.productId,
					productStates: transformedProductStates
				}
			})

			const result = await bulkUpdateProductStates(updates)

			if (result?.message === 'OK' || result) {
				SuccessToast(t('Product.productStatesUpdated'))
				onClose()
				clearItems()
				router.refresh()
			}
		} catch (error) {
			console.error('Error updating product states:', error)
		}
	}

	return (
		<Dialog opened={opened} onClose={onClose} size="large">
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<Stack gap={7}>
						<Text variant="h2" color="neutral.900">
							{t('Product.updateProductStates')}
						</Text>
						<Stack gap={7} style={{ maxHeight: '57.9vh', overflowY: 'auto' }}>
							{loading ? (
								<Text>{t('General.loading')}</Text>
							) : productsWithStates.length === 0 ? (
								<Text>{t('General.noItemsSelected')}</Text>
							) : (
								productsWithStates.map((product, productIndex) => {
									const productName = product.name || `Product ${productIndex + 1}`
									const fieldName = `products.${productIndex}.productStates`

									return (
										<Box key={product.id}>
											<Stack gap={3}>
												<Text variant="h4" color="neutral.900">
													{productName}
												</Text>
												<ProductStateFormTable name={fieldName} serviceLocations={serviceLocations} users={users} />
											</Stack>
										</Box>
									)
								})
							)}
						</Stack>
						<Box position="absolute" style={{ bottom: tokens.spacing[6], right: tokens.spacing[10] }}>
							<Inline gap={3} justifyContent="flex-end">
								<Button type="button" variant="secondary" onClick={onClose}>
									{t('General.cancel')}
								</Button>
								<Button type="submit" variant="primary">
									{t('General.save')}
								</Button>
							</Inline>
						</Box>
					</Stack>
				</form>
			</FormProvider>
		</Dialog>
	)
}
