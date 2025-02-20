'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { ManageJourneyIntroWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyIntroWrapper'
import { FormControl } from '@/components/inputs/form-control'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useManageContentSelection } from '@/store/manage-content-selection'
import { useStepsStore } from '@/store/steps'
import { RadioGroup } from '@/components/inputs/radio-group'
import { requiredString } from 'schemas'

const formSchema = z.object({
	isGeneral: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

export const IsTemplateGeneral = () => {
	const { setIsGeneral } = useManageContentSelection()
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()
	const options = [
		{ label: t('General.yes'), value: 'true' },
		{ label: t('General.no'), value: 'false' }
	]

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { isGeneral: '' }
	})

	const onSubmit = async (data: Schema) => {
		setIsGeneral(data.isGeneral)
		if (currentStep) {
			setCurrentStep(currentStep + 1)
		}
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingX={6}>
					<ManageJourneyIntroWrapper>
						<Stack gap={6} alignItems="center">
							<Text fontSize="xbig" fontWeight="semibold" color="neutral.800" textAlign="center">
								{t('Templates.isGeneralTitle')}
							</Text>
							<Text fontSize="small" color="neutral.800" textAlign="center">
								{t('Templates.isGeneralDescription')}
							</Text>
							<Box width="100%">
								<FormControl name="isGeneral">
									<RadioGroup options={options} />
								</FormControl>
							</Box>
						</Stack>
					</ManageJourneyIntroWrapper>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
