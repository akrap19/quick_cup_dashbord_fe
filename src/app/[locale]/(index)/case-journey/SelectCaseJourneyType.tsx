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
import { CaseJourneyTypeEnum } from 'enums/caseJourneyType'
import { requiredString } from 'schemas'

const formSchema = z.object({
	caseJourneyType: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

export const SelectCaseJourneyType = () => {
	const { type, setType } = useCaseJourneyStore()
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()
	if (type) {
		setType()
	}
	const options = [
		{ label: t('CaseJourney.createFromTemplate'), value: CaseJourneyTypeEnum.TEMPLATE },
		{ label: t('CaseJourney.createCustom'), value: CaseJourneyTypeEnum.CUSTOM }
	]

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {}
	})

	const onSubmit = async (data: Schema) => {
		setType(data.caseJourneyType as CaseJourneyTypeEnum)
		if (currentStep) {
			setCurrentStep(currentStep + 1)
		}
	}

	return (
		<FormProvider {...form}>
			<form style={{ width: '100%' }} onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingTop={6}>
					<Box paddingX={6} paddingTop={6} borderTop="thin" borderColor="neutral.300">
						<ManageJourneyIntroWrapper>
							<Stack gap={6} alignItems="center">
								<Text fontSize="xbig" fontWeight="semibold" textAlign="center" color="neutral.800">
									{t('CaseJourney.chooseCaseJourneyTypeCreationTitle')}
								</Text>
								<Text fontSize="small" color="neutral.800" textAlign="center">
									{t('CaseJourney.chooseCaseJourneyTypeCreationDescription')}
								</Text>
								<Box width="100%">
									<FormControl name="caseJourneyType">
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
