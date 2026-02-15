'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { createAdditionalCost } from 'api/services/additionalCosts'
import { ROUTES } from 'parameters'
import { requiredString } from 'schemas'
import { BillingTypeEnum } from 'enums/billingTypeEnum'
import { MethodOfPayment } from 'enums/methodOfPaymentEnum'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { ProductStateStatusEnum } from 'enums/productStateStatusEnum'
import { AdditionalCostCalculationTypeEnum } from 'enums/additionalCostCalculationTypeEnum'

import AdditionalCostsForm from '../form'
import { useOpened } from '@/hooks/use-toggle'

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

const AdditionalCostsAdd = () => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	useNavbarItems({ title: 'AdditionalCosts.add', backLabel: 'AdditionalCosts.back' })
	const cancelDialog = useOpened()

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			billingType: undefined,
			methodOfPayment: undefined,
			acquisitionType: undefined,
			calculationType: null,
			maxPieces: null,
			enableUpload: false,
			price: null,
			calculationStatus: null
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWithoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const payload = {
			...dataWithoutEmptyString,
			name: dataWithoutEmptyString.name?.trim() || '',
			price: dataWithoutEmptyString.price ? Number(dataWithoutEmptyString.price) : undefined,
			maxPieces: dataWithoutEmptyString.maxPieces ? Number(dataWithoutEmptyString.maxPieces) : undefined
		}
		const result = await createAdditionalCost(payload)

		if (result?.message === 'OK') {
			SuccessToast(t('AdditionalCosts.successfullyCreated'))
			push(ROUTES.ADDITIONAL_COSTS)
			refresh()
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<AdditionalCostsForm cancelDialog={cancelDialog} />
					</form>
				</FormProvider>
			</FormWrapper>
			<CancelAddDialog cancelDialog={cancelDialog} title="AdditionalCosts.cancelAdd" values={form.getValues()} />
		</>
	)
}

export default AdditionalCostsAdd
