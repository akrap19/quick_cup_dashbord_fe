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
import { useOpened } from '@/hooks/use-toggle'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { createProduct } from 'api/services/products'
import { ROUTES } from 'parameters'
import { requiredString } from 'schemas'

import BuyForm from '../form'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'

const formSchema = z.object({
	name: requiredString.shape.scheme,
	description: z.string().optional()
})

type Schema = z.infer<typeof formSchema>

interface Props {}

const BuyAdd = ({}: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const cancelDialog = useOpened()
	useNavbarItems({ title: 'Buy.add', backLabel: 'Buy.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: ''
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const result = await createProduct({ ...dataWIhoutEmptyString, acquisitionType: AcquisitionTypeEnum.BUY })

		if (result?.message === 'OK') {
			SuccessToast(t('Buy.successfullyCreated'))
			push(ROUTES.BUY)
			refresh()
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<BuyForm cancelDialog={cancelDialog} />
					</form>
				</FormProvider>
			</FormWrapper>
			<CancelAddDialog cancelDialog={cancelDialog} title="Buy.cancelAdd" values={form.getValues()} />
		</>
	)
}

export default BuyAdd
