'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { BaseCode } from 'api/models/common/baseCode'
import { Language } from 'api/models/language/language'
import { updateLanguage } from 'api/services/languages'
import { requiredString } from 'schemas'

import LanguageForm from '../../form'

const formSchema = z.object({
	language: requiredString.shape.scheme,
	status: requiredString.shape.scheme,
	autoTranslate: z.boolean()
})

type Schema = z.infer<typeof formSchema>

interface Props {
	language: Language
	languages: BaseCode[]
}

const LanguageEdit = ({ language, languages }: Props) => {
	const { back } = useRouter()
	useNavbarItems({ title: 'Languages.edit', backLabel: 'Languages.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { language: language.name, autoTranslate: language.autoTranslate, status: language.status }
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const languageName = languages.find(language => language.code === data.language)?.name ?? language.name
		const result = await updateLanguage({
			languageId: language.languageId,
			autoTranslate: data.autoTranslate,
			status: data.status,
			name: languageName
		})
		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'Languages.successfullyEdited')
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
