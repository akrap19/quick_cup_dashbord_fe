'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'
import { updateAdditionalCost } from 'api/services/additionalCosts'
import { requiredString } from 'schemas'
import { BillingTypeEnum } from 'enums/billingTypeEnum'
import { MethodOfPayment } from 'enums/methodOfPaymentEnum'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { ProductStateStatusEnum } from 'enums/productStateStatusEnum'

import AdditionalCostsForm from '../../form'

const formSchema = z.object({
	name: requiredString.shape.scheme,
	billingType: z.nativeEnum(BillingTypeEnum),
	methodOfPayment: z.nativeEnum(MethodOfPayment),
	acquisitionType: z.nativeEnum(AcquisitionTypeEnum),
	price: z.coerce.number().min(0),
	calculationStatus: z.nativeEnum(ProductStateStatusEnum).optional()
})

type Schema = z.infer<typeof formSchema>

interface Props {
	additionalCost: AdditionalCosts
}

const AdditionalCostsEdit = ({ additionalCost }: Props) => {
	const { back, refresh } = useRouter()
	useNavbarItems({ title: 'AdditionalCosts.edit', backLabel: 'AdditionalCosts.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: additionalCost?.name ?? '',
			billingType: additionalCost?.billingType ?? BillingTypeEnum.ONE_TIME,
			methodOfPayment: additionalCost?.methodOfPayment ?? MethodOfPayment.BEFORE,
			acquisitionType: additionalCost?.acquisitionType ?? AcquisitionTypeEnum.BUY,
			price: additionalCost?.price ?? 0,
			calculationStatus: additionalCost?.calculationStatus ?? undefined
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWithoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const payload = {
			...dataWithoutEmptyString,
			name: dataWithoutEmptyString.name?.trim() || '',
			price: Number(dataWithoutEmptyString.price) || 0,
			id: additionalCost?.id
		}
		const result = await updateAdditionalCost(payload)
		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'AdditionalCosts.successfullyEdited')
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
					<AdditionalCostsForm />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default AdditionalCostsEdit
