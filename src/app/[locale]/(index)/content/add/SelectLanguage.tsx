'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { ManageJourneyIntroWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyIntroWrapper'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { FormControl } from '@/components/inputs/form-control'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'
import { useStepsStore } from '@/store/steps'
import { Language } from 'api/models/language/language'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

interface Props {
	languages: Language[]
}

const formSchema = z.object({
	language: z.string().min(1, { message: 'ValidationMeseges.required' })
})

type Schema = z.infer<typeof formSchema>

export const SelectLanguage = ({ languages }: Props) => {
	const { currentStep, setCurrentStep } = useStepsStore()
	const { setLanguage } = useManageContent()
	const t = useTranslations()
	const { replace } = useRouter()
	const searchParams = useSearchParams()
	const currentSearchParamas = qs.parse(searchParams.toString())
	const transformedLanguageArray = languages?.map((language: Language) => {
		return {
			id: language.languageId,
			name: language.name
		}
	})
	const handleLanguage = (value: string) => {
		const query = { ...currentSearchParamas, ['languageId']: value }
		const url = qs.stringifyUrl(
			{
				url: window.location.href,
				query
			},
			{ skipEmptyString: true }
		)

		replace(url)
	}

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { language: '' }
	})

	const onSubmit = async (data: any) => {
		const language = transformedLanguageArray.find(language => language.id === data.language)

		setLanguage(language)
		if (language?.id) {
			handleLanguage(language?.id)
		}
		if (currentStep) {
			setCurrentStep(currentStep + 1)
		}
	}

	return (
		<FormProvider {...form}>
			<form style={{ width: '100%' }} onSubmit={form.handleSubmit(onSubmit)}>
				<ManageJourneyIntroWrapper>
					<Stack gap={6} alignItems="center">
						<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
							{t('ManageContent.selectLanguage')}
						</Text>
						<Text fontSize="small" color="neutral.800" textAlign="center">
							{t('ManageContent.selectLanguageDescription')}
						</Text>
						<Box width="100%">
							<FormControl name="language">
								<SearchDropdown
									placeholder="General.language"
									options={transformedLanguageArray}
									alwaysShowSearch
									isFilter
								/>
							</FormControl>
						</Box>
					</Stack>
				</ManageJourneyIntroWrapper>
				<Actions />
			</form>
		</FormProvider>
	)
}
