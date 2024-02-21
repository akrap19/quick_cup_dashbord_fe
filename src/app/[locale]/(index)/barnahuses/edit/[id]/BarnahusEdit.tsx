'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Barnahus } from 'api/models/barnahuses/barnahus'
import { updateBarnahus } from 'api/services/barnahuses'
import { requiredString } from 'schemas'

import BarnahusForm from '../../form'

const formSchema = z.object({
	name: requiredString.shape.scheme,
	location: requiredString.shape.scheme,
	admin: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

interface Props {
	barnahus: Barnahus
}

const BarnahusEdit = ({ barnahus }: Props) => {
	const t = useTranslations()
	const { back } = useRouter()
	useNavbarItems({ title: 'Barnahuses.edit', backLabel: 'Barnahuses.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { name: barnahus.name, location: barnahus.location, admin: barnahus.admin }
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const result = await updateBarnahus({ ...data, id: barnahus.id })
		if (result?.message === 'OK') {
			SuccessToast(t('Barnahuses.successfullyEdited'))
			back()
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<BarnahusForm />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default BarnahusEdit
