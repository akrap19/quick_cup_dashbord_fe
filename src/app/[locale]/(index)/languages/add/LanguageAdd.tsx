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
import { BaseCode } from 'api/models/common/baseCode'
import { createLanguage } from 'api/services/languages'
import { ROUTES } from 'parameters'
import { requiredString } from 'schemas'

import LanguageForm from '../form'

const formSchema = z.object({
	language: requiredString.shape.scheme,
	autoTranslate: z.boolean()
})

type Schema = z.infer<typeof formSchema>

interface Props {
	languages: BaseCode[]
	gotDefaultLanguage: boolean
}

const LanguageAdd = ({ languages, gotDefaultLanguage }: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const cancelDialog = useOpened()
	useNavbarItems({ title: 'Languages.add', backLabel: 'Languages.back', cancelDialog })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { language: '', autoTranslate: true }
	})

	const onSubmit = async (data: Schema) => {
		const languageName = languages.find(language => language.code === data.language)?.name
		const result = await createLanguage({ autoTranslate: data.autoTranslate, code: data.language, name: languageName })
		if (result?.message === 'OK') {
			SuccessToast(t('Languages.successfullyCreated'))
			push(ROUTES.LANGUAGES)
			refresh()
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<LanguageForm languages={languages} gotDefaultLanguage={gotDefaultLanguage} cancelDialog={cancelDialog} />
					</form>
				</FormProvider>
			</FormWrapper>
			<CancelAddDialog cancelDialog={cancelDialog} title="Languages.cancelAdd" values={form.getValues()} />
		</>
	)
}

export default LanguageAdd
