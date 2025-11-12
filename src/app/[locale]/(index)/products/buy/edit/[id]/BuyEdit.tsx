'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { Product } from 'api/models/products/product'
import { updateProduct } from 'api/services/products'
import { requiredString } from 'schemas'

import BuyForm from '../../form'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

const formSchema = z.object({
	name: requiredString.shape.scheme,
	description: z.string().optional()
})

type Schema = z.infer<typeof formSchema>

interface Props {
	product: Product
}

const BuyEdit = ({ product }: Props) => {
	const { back, refresh } = useRouter()
	useNavbarItems({ title: 'Buy.edit', backLabel: 'Buy.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: product?.name ?? '',
			description: product?.description ?? ''
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const result = await updateProduct({
			...dataWIhoutEmptyString,
			id: product?.id,
			acquisitionType: AcquisitionTypeEnum.BUY
		})

		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'Buy.successfullyEdited')

			refresh()
			setTimeout(() => {
				back()
			}, 500)
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<BuyForm />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default BuyEdit
