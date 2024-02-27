'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { BaseCode } from 'api/models/common/baseCode'
import { Language } from 'api/models/language/language'
import { updateLanguage } from 'api/services/languages'
import { requiredString } from 'schemas'

import LanguageForm from '../../form'

const formSchema = z.object({
	id: requiredString.shape.scheme,
	status: requiredString.shape.scheme,
	autoTranslate: z.boolean()
})

type Schema = z.infer<typeof formSchema>

interface Props {
	language: Language
	languages: BaseCode[]
}

const LanguageEdit = ({ language, languages }: Props) => {
	const t = useTranslations()
	const { back } = useRouter()
	useNavbarItems({ title: 'Languagees.edit', backLabel: 'Languagees.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { id: language.name, autoTranslate: language.autoTranslate, status: language.status }
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const result = await updateLanguage({
			...data,
			id: language.id
		})
		if (result?.message === 'OK') {
			SuccessToast(t('Languagees.successfullyEdited'))
			back()
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<LanguageForm languages={languages} />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default LanguageEdit
