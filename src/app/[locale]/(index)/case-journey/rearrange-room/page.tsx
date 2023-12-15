'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { ManageJourneyIntroWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyIntroWrapper'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useJourneyContentStore } from '@/store/journey-content'

import { CardContainer } from './CardContainer'

const formSchema = z.object({
	caseId: z.string().min(1, { message: 'ValidationMeseges.required' })
})

type Schema = z.infer<typeof formSchema>

const RearrangeRoom = () => {
	const { setCurrentStep } = useJourneyContentStore()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { caseId: '' }
	})

	const onSubmit = async () => {
		setCurrentStep(2)
	}

	return (
		<FormProvider {...form}>
			<form style={{ width: '100%' }} onSubmit={form.handleSubmit(onSubmit)}>
				<ManageJourneyIntroWrapper>
					<Stack gap={6} alignItems="center">
						<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
							{t('CaseJourney.dragToRearrangeTitle')}
						</Text>
						<Text fontSize="small" color="neutral.800" textAlign="center">
							{t('CaseJourney.dragToRearrangeDescription')}
						</Text>
						{/* <CardContainer /> */}
						<CardContainer />
					</Stack>
				</ManageJourneyIntroWrapper>
				<Actions />
			</form>
		</FormProvider>
	)
}

export default RearrangeRoom
