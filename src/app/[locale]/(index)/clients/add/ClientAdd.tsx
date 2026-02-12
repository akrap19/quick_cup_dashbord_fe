'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { string, z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { ConfirmActionDialog } from '@/components/overlay/confirm-action-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { createClient } from 'api/services/clients'
import { ROUTES } from 'parameters'
import { emailSchema, phoneNumberScheme, productPriceSchema, requiredString } from 'schemas'

import ClientForm from '../form'
import { Product } from 'api/models/products/product'
import { useState, useMemo } from 'react'

const clientProductPriceSchema = z.object({
	productId: z.string().optional(),
	prices: z.array(productPriceSchema).optional().default([])
})

const formSchema = z.object({
	email: emailSchema.shape.email,
	firstName: requiredString.shape.scheme,
	lastName: requiredString.shape.scheme,
	phoneNumber: phoneNumberScheme.shape.phone,
	companyName: requiredString.shape.scheme,
	pin: requiredString.shape.scheme,
	street: string().optional().nullable(),
	location: string().optional(),
	productPrices: z.array(clientProductPriceSchema).optional().default([])
})

type Schema = z.infer<typeof formSchema>

interface Props {
	productsPrices: Product[]
}

const ClientAdd = ({ productsPrices }: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const confirmDialog = useOpened()
	const cancelDialog = useOpened()
	const [showProducts, setShowProducts] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	useNavbarItems({ title: 'Clients.add', backLabel: 'Clients.back' })

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
			email: '',
			firstName: '',
			lastName: '',
			phoneNumber: '',
			companyName: '',
			pin: '',
			street: '',
			location: '',
			productPrices: initialProductPrices
		}
	})

	const handleDialog = () => {
		confirmDialog.toggleOpened()
	}

	const onSubmit = async () => {
		setIsSubmitting(true)
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
		const result = await createClient(dataWIhoutEmptyString)

		if (result?.message === 'OK') {
			SuccessToast(t('Clients.successfullyCreated'))
			push(ROUTES.CLIENTS)
			refresh()
		} else {
			setIsSubmitting(false)
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(handleDialog)}>
						<ClientForm
							form={form}
							showProducts={showProducts}
							setShowProducts={setShowProducts}
							cancelDialog={cancelDialog}
							productsPrices={productsPrices ?? []}
						/>
					</form>
				</FormProvider>
			</FormWrapper>
			<ConfirmActionDialog
				title="Clients.addNew"
				description="Clients.addClientDescription"
				buttonLabel="General.addAndInvite"
				buttonActionLoading={isSubmitting}
				confirmDialog={confirmDialog}
				onSubmit={onSubmit}
			/>
			<CancelAddDialog cancelDialog={cancelDialog} title="Clients.cancelAdd" values={form.getValues()} />
		</>
	)
}

export default ClientAdd
