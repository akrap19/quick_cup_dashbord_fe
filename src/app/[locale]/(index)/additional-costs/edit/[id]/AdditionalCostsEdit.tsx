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
import { AdditionalCostCalculationTypeEnum } from 'enums/additionalCostCalculationTypeEnum'

import AdditionalCostsForm from '../../form'

const formSchema = z.object({
	name: requiredString.shape.scheme,
	billingType: z.nativeEnum(BillingTypeEnum),
	methodOfPayment: z.nativeEnum(MethodOfPayment),
	acquisitionType: z.nativeEnum(AcquisitionTypeEnum),
	calculationType: z.nativeEnum(AdditionalCostCalculationTypeEnum).nullable().optional(),
	maxPieces: z.coerce.number().min(0).nullable().optional(),
	enableUpload: z.boolean().optional(),
	price: z.coerce.number().min(0).nullable().optional(),
	calculationStatus: z.nativeEnum(ProductStateStatusEnum).nullable().optional()
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
			billingType: additionalCost?.billingType ?? undefined,
			methodOfPayment: additionalCost?.methodOfPayment ?? undefined,
			acquisitionType: additionalCost?.acquisitionType ?? undefined,
			calculationType: additionalCost?.calculationType ?? null,
			maxPieces: additionalCost?.maxPieces ?? null,
			enableUpload: additionalCost?.enableUpload ?? false,
			price: additionalCost?.price ?? null,
			calculationStatus: additionalCost?.calculationStatus ?? null
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWithoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const payload = {
			...dataWithoutEmptyString,
			name: dataWithoutEmptyString.name?.trim() || '',
			price: dataWithoutEmptyString.price ? Number(dataWithoutEmptyString.price) : undefined,
			maxPieces: dataWithoutEmptyString.maxPieces ? Number(dataWithoutEmptyString.maxPieces) : undefined,
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
