'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { ManageJourneyIntroWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyIntroWrapper'
import { FormControl } from '@/components/inputs/form-control'
import { RadioGroup } from '@/components/inputs/radio-group'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useCaseJourneyStore } from '@/store/case-journey'
import { useStepsStore } from '@/store/steps'
import { requiredString } from 'schemas'

const formSchema = z.object({
	enebleNotes: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

export const EnebleNotes = () => {
	const { setEnebleNotes } = useCaseJourneyStore()
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()
	const options = [
		{ label: t('CaseJourney.enableNotes'), value: 'true' },
		{ label: t('CaseJourney.disableNotes'), value: 'false' }
	]

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {}
	})

	const data = form.getValues()

	const onSubmit = async () => {
		setEnebleNotes(Boolean(data?.enebleNotes))
		if (currentStep) {
			setCurrentStep(currentStep + 1)
		}
	}

	return (
		<FormProvider {...form}>
			<form style={{ width: '100%' }} onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingTop={6}>
					<Box paddingX={6} paddingTop={6}>
						<ManageJourneyIntroWrapper>
							<Stack gap={6} alignItems="center">
								<Text fontSize="xbig" fontWeight="semibold" textAlign="center" color="neutral.800">
									{t('CaseJourney.enableNotesTitle')}
								</Text>
								<Text fontSize="small" color="neutral.800" textAlign="center">
									{t('CaseJourney.enableNotesDescription')}
								</Text>
								<Box width="100%">
									<FormControl name="enebleNotes">
										<RadioGroup options={options} />
									</FormControl>
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
