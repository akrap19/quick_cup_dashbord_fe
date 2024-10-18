'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { ManageJourneyIntroWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyIntroWrapper'
import { RearrangeableCards } from '@/components/custom/rearrengable-cards/RearrangeableCards'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useStepsStore } from '@/store/steps'
import { CardBase } from 'api/models/common/cardBase'

interface Props {
	cards: CardBase[]
	setCards: Dispatch<SetStateAction<CardBase[]>>
}

const formSchema = z.object({})

type Schema = z.infer<typeof formSchema>

export const RearrangeRoom = ({ cards, setCards }: Props) => {
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { templateId: '' }
	})

	const onSubmit = async () => {
		if (currentStep) {
			setCurrentStep(currentStep + 1)
		}
	}

	return (
		<FormProvider {...form}>
			<form style={{ width: '100%' }} onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingTop={12} paddingBottom={8}>
					<ManageJourneyIntroWrapper>
						<Stack gap={6} alignItems="center">
							<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
								{t('CaseJourney.dragToRearrangeTitle')}
							</Text>
							<Text fontSize="small" color="neutral.800" textAlign="center">
								{t('CaseJourney.dragToRearrangeDescription')}
							</Text>
							<RearrangeableCards cards={cards} setCards={setCards} />
						</Stack>
					</ManageJourneyIntroWrapper>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
