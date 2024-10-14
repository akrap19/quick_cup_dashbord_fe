'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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
import { requiredString } from 'schemas'
import { TextInput } from '@/components/inputs/text-input'
import { useStepsStore } from '@/store/steps'
import { useManageTemplate } from '@/store/manage-template'

const formSchema = z.object({
	name: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

export const EnterTemplateName = () => {
	const { setName } = useManageTemplate()
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { name: '' }
	})

	const formData = form?.getValues()

	const onSubmit = async () => {
		setName(formData?.name)
		if (currentStep) {
			setCurrentStep(currentStep + 1)
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
									{t('Templates.nameTitle')}
								</Text>
								<Text fontSize="small" color="neutral.800" textAlign="center">
									{t('Templates.nameDescription')}
								</Text>
								<Box width="100%" style={{ maxWidth: '20.5rem' }}>
									<Stack gap={6}>
										<FormControl name="name">
											<FormControl.Label>
												<RequiredLabel>{t('Templates.name')}</RequiredLabel>
											</FormControl.Label>
											<TextInput />
										</FormControl>
										<Button type="submit" disabled={!form.formState.isValid}>
											{t('General.save&Continue')}
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
