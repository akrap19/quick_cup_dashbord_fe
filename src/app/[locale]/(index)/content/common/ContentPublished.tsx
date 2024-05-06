'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { ManageJourneyIntroWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyIntroWrapper'
import { Button } from '@/components/inputs/button'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label/RequiredLabel'
import { Select } from '@/components/inputs/select'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { ROUTES } from 'parameters'

const formSchema = z.object({})

type Schema = z.infer<typeof formSchema>

export const ContentPublished = () => {
	const { push } = useRouter()
	const router = useRouter()
	const t = useTranslations()
	const languageOptions = [
		{ value: '', label: t('ManageContent.selectLanguage') },
		{ value: 'se', label: t('Languages.en') },
		{ value: 'en', label: t('Languages.se') }
	]

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { generalIntrudactionTitle: '' }
	})
	const formData = form?.getValues()

	const onSubmit = async () => {
		console.log('data', formData)
		push(ROUTES.AUTOTRANSLATE_AND_REVIEW)
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
											<Select sizes="large" options={languageOptions} />
										</FormControl>
										<Button type="submit">{t('ManageContent.autoTranslateAndReviewContent')}</Button>
										<Button onClick={() => router.back()} variant="secondary">
											{t('ManageContent.backToContentPage')}
										</Button>
									</Stack>
								</Box>
							</Stack>
						</ManageJourneyIntroWrapper>
					</Box>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
