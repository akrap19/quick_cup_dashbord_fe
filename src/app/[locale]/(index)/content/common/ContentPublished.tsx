'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { ManageJourneyIntroWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyIntroWrapper'
import { Button } from '@/components/inputs/button'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label/RequiredLabel'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { translateLanguage } from 'api/services/languages'
import { Language } from 'api/models/language/language'
import { ROUTES } from 'parameters'

interface Props {
	languages: Language[]
}

const formSchema = z.object({
	language: z.string().min(1, { message: 'ValidationMeseges.required' })
})

type Schema = z.infer<typeof formSchema>

export const ContentPublished = ({ languages }: Props) => {
	const t = useTranslations()
	const router = useRouter()

	const transformedLanguageArray = languages
		?.filter((language: Language) => language?.autoTranslate)
		.map((language: Language) => {
			return {
				id: language.languageId,
				name: language.name
			}
		})

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { language: '' }
	})

	const formData = form?.getValues()

	const onSubmit = async () => {
		const result = await translateLanguage(formData.language)

		if (result?.message === 'OK') {
			if (typeof window !== 'undefined') {
				localStorage.setItem('content', JSON.stringify(result?.data))
			}
			router.push(ROUTES.AUTOTRANSLATE_AND_REVIEW + '?languageId=' + formData?.language)
		}
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingTop={6}>
					<Box paddingX={6} paddingTop={6} borderTop="thin" borderColor="neutral.300">
						<ManageJourneyIntroWrapper>
							<Stack gap={6} alignItems="center">
								<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
									{t('ManageContent.contentPublishedTitle')}
								</Text>
								<Text fontSize="small" color="neutral.800" textAlign="center">
									{t('ManageContent.contentPublishedDescription')}
								</Text>
								<Box width="100%" style={{ maxWidth: '20.5rem' }}>
									<Stack gap={6}>
										<FormControl name="language">
											<FormControl.Label>
												<RequiredLabel>{t('General.language')}</RequiredLabel>
											</FormControl.Label>
											<SearchDropdown placeholder="General.language" options={transformedLanguageArray} isFilter />
										</FormControl>
										<Button type="submit" disabled={!form.formState.isValid}>
											{t('ManageContent.autoTranslateAndReviewContent')}
										</Button>
										<Button onClick={() => router.back()} variant="secondary">
											{t('ManageContent.backToContentPage')}
										</Button>
									</Stack>
								</Box>
							</Stack>
						</ManageJourneyIntroWrapper>
					</Box>
				</Box>
			</form>
		</FormProvider>
	)
}
