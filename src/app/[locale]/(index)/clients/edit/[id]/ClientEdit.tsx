'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { string, z } from 'zod'
import { useState, useMemo } from 'react'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { ConfirmActionDialog } from '@/components/overlay/confirm-action-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { Client } from 'api/models/clients/client'
import { updateClient } from 'api/services/clients'
import { emailSchema, phoneNumberScheme, productPriceSchema, requiredString } from 'schemas'
import { Product } from 'api/models/products/product'

import ClientForm from '../../form'

const clientProductPriceSchema = z.object({
	productId: z.string().optional(),
	prices: z.array(productPriceSchema).optional().default([])
})

const formSchema = z.object({
	email: emailSchema.shape.email,
	firstName: requiredString.shape.scheme,
	lastName: requiredString.shape.scheme,
	phoneNumber: phoneNumberScheme.shape.phone,
	location: string().optional(),
	productPrices: z.array(clientProductPriceSchema).optional().default([])
})

type Schema = z.infer<typeof formSchema>

interface Props {
	client: Client
	productsPrices: Product[]
}

const ClientEdit = ({ client, productsPrices }: Props) => {
	const t = useTranslations()
	const { back, refresh } = useRouter()
	const confirmDialog = useOpened()
	const cancelDialog = useOpened()
	const [showProducts, setShowProducts] = useState(false)
	useNavbarItems({ title: 'Clients.edit', backLabel: 'Clients.back' })

	// Map client.productPrices to form structure, matching by productId
	const initialClientProductPrices = useMemo(() => {
		return productsPrices?.map(product => {
			// Find matching client product price by productId
			const clientProductPrice = client.productPrices?.find(cp => cp.productId === product.productId)

			return {
				productId: product.productId,
				prices:
					clientProductPrice?.prices?.map(price => ({
						minQuantity: price.minQuantity,
						maxQuantity: price.maxQuantity,
						price: price.price
					})) ||
					product.prices?.map(price => ({
						minQuantity: price.minQuantity,
						maxQuantity: price.maxQuantity,
						price: price.price
					})) ||
					[]
			}
		})
	}, [client?.productPrices, productsPrices])

	// Initial product prices from productsPrices (for comparison)
	const initialProductPrices = useMemo(
		() =>
			productsPrices?.map(product => ({
				productId: product.productId,
				prices:
					product.prices?.map(price => ({
						minQuantity: price.minQuantity,
						maxQuantity: price.maxQuantity,
						price: price.price
					})) || []
			})),
		[productsPrices]
	)

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: client.email,
			firstName: client.firstName,
			lastName: client.lastName,
			phoneNumber: client.phoneNumber ?? '',
			location: client.location ?? '',
			productPrices: initialClientProductPrices
		}
	})

	const handleDialog = () => {
		confirmDialog.toggleOpened()
	}

	const onSubmit = async () => {
		const data = form.getValues()

		const hasPriceChanged = (initialPrice: any, currentPrice: any) => {
			return (
				initialPrice?.minQuantity !== currentPrice?.minQuantity ||
				initialPrice?.maxQuantity !== currentPrice?.maxQuantity ||
				initialPrice?.price !== currentPrice?.price
			)
		}

		const hasProductChanged = (initialProduct: any, currentProduct: any) => {
			const initialPrices = initialProduct?.prices || []
			const currentPrices = currentProduct?.prices || []

			if (initialPrices.length !== currentPrices.length) {
				return true
			}

			for (let i = 0; i < currentPrices.length; i++) {
				if (hasPriceChanged(initialPrices[i], currentPrices[i])) {
					return true
				}
			}

			return false
		}

		// Compare current form values with initial productsPrices (not client.productPrices)
		const changedProducts = data.productPrices
			.map((currentProduct, index) => {
				const initialProduct = initialProductPrices[index]
				if (hasProductChanged(initialProduct, currentProduct)) {
					return {
						productId: currentProduct.productId,
						prices: currentProduct.prices?.map((price: any) => ({
							minQuantity: price.minQuantity,
							maxQuantity: price.maxQuantity,
							price: price.price
						}))
					}
				}
				return null
			})
			.filter((product): product is NonNullable<typeof product> => product !== null)

		const shortenedDataWithProductPrices = {
			...data,
			productPrices: showProducts && changedProducts.length > 0 ? changedProducts : undefined
		}

		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(shortenedDataWithProductPrices)
		const result = await updateClient({ ...dataWIhoutEmptyString, userId: client.userId })
		if (result?.message === 'OK') {
			SuccessToast(t('Clients.successfullyEdited'))
			localStorage.setItem('editMessage', 'Clients.successfullyEdited')
			refresh()

			setTimeout(() => {
				back()
			}, 500)
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(handleDialog)}>
						<ClientForm
							form={form}
							isEdit
							showProducts={showProducts}
							setShowProducts={setShowProducts}
							cancelDialog={cancelDialog}
							productsPrices={productsPrices ?? []}
						/>
					</form>
				</FormProvider>
			</FormWrapper>
			<ConfirmActionDialog
				title="Clients.edit"
				description="Clients.editClientDescription"
				buttonLabel="General.save"
				confirmDialog={confirmDialog}
				onSubmit={onSubmit}
			/>
			<CancelAddDialog cancelDialog={cancelDialog} title="Clients.cancelEdit" values={form.getValues()} />
		</>
	)
}

export default ClientEdit
