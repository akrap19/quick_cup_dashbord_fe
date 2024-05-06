'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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
import { Base } from 'api/models/common/base'
import { ROUTES } from 'parameters'

interface Props {
	languages: Base[]
}

const formSchema = z.object({
	language: z.string().min(1, { message: 'ValidationMeseges.required' })
})

type Schema = z.infer<typeof formSchema>

export const SelectLanguage = ({ languages }: Props) => {
	const { push } = useRouter()
	const { currentStep, setCurrentStep } = useStepsStore()
	const { setLanguage } = useManageContent()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { language: '' }
	})

	const onSubmit = async (data: any) => {
		const language = languages.find(language => language.id === data.language)

		setLanguage(language)
		push(ROUTES.ADD_CONTENT)
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
								<SearchDropdown placeholder="General.language" options={languages} isFilter alwaysShowSearch />
							</FormControl>
						</Box>
					</Stack>
				</ManageJourneyIntroWrapper>
				<Actions />
			</form>
		</FormProvider>
	)
}
