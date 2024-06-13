'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull'
import { Admins } from 'api/models/admin/Admins'
import { Barnahus } from 'api/models/barnahuses/barnahus'
import { Base } from 'api/models/common/base'
import { updateBarnahus } from 'api/services/barnahuses'
import { requiredString } from 'schemas'

import BarnahusForm from '../../form'

const formSchema = z.object({
	name: requiredString.shape.scheme,
	location: requiredString.shape.scheme,
	masterAdmin: z.string().optional()
})

type Schema = z.infer<typeof formSchema>

interface Props {
	barnahus: Barnahus
	locations: Base[]
	masterAdmins: Admins[]
}

const BarnahusEdit = ({ barnahus, locations, masterAdmins }: Props) => {
	const t = useTranslations()
	const { back } = useRouter()
	useNavbarItems({ title: 'Barnahuses.edit', backLabel: 'Barnahuses.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { name: barnahus.name, location: barnahus.location, masterAdmin: barnahus.admin ?? '' }
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringWithNull(data)
		const result = await updateBarnahus({
			barnahusId: barnahus.barnahusId,
			name: dataWIhoutEmptyString.name,
			location: dataWIhoutEmptyString.location,
			adminId: barnahus.adminId ?? undefined
		})
		if (result?.message === 'OK') {
			SuccessToast(t('Barnahuses.successfullyEdited'))
			back()
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<BarnahusForm locations={locations} masterAdmins={masterAdmins} />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default BarnahusEdit
