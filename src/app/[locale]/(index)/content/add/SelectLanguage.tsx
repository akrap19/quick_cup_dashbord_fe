import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { ManageJourneyIntroWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyIntroWrapper'
import { FormControl } from '@/components/inputs/form-control'
import { Select } from '@/components/inputs/select'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useJourneyContentStore } from '@/store/journey-content'
import { useManageContent } from '@/store/manage-content'

const formSchema = z.object({
	language: z.string().min(1, { message: 'ValidationMeseges.required' })
})

type Schema = z.infer<typeof formSchema>

export const SelectLanguage = () => {
	const { setCurrentStep } = useJourneyContentStore()
	const { setLanguage } = useManageContent()
	const t = useTranslations()
	const languageOptions = [
		{ value: '', label: t('ManageContent.selectLanguage') },
		{ value: 'se', label: t('Languages.en') },
		{ value: 'en', label: t('Languages.se') }
	]

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { language: '' }
	})

	const onSubmit = async (data: any) => {
		setCurrentStep(3)
		setLanguage(data.language)
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
								<Select sizes="large" options={languageOptions} />
							</FormControl>
						</Box>
					</Stack>
				</ManageJourneyIntroWrapper>
				<Actions />
			</form>
		</FormProvider>
	)
}
