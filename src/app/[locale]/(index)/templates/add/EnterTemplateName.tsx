'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { ManageJourneyIntroWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyIntroWrapper'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label/RequiredLabel'
import { TextInput } from '@/components/inputs/text-input'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useManageContentSelection } from '@/store/manage-content-selection'
import { useStepsStore } from '@/store/steps'
import { requiredString } from 'schemas'
import { useEffect } from 'react'
import { templateAvailable } from 'api/services/templates'

const formSchema = z
	.object({
		name: requiredString.shape.scheme
	})
	.refine(
		async data => {
			if (data.name !== '') {
				const response = await templateAvailable(data.name)
				return response?.data?.available
			}
		},
		{
			message: 'Templates.nameUnavailable',
			path: ['name']
		}
	)

type Schema = z.infer<typeof formSchema>

export const EnterTemplateName = () => {
	const { setName } = useManageContentSelection()
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { name: '' }
	})

	const { name } = form.watch()

	useEffect(() => {
		if (name !== '') {
			form.trigger('name')
		}
	}, [name])

	const onSubmit = async () => {
		setName(name)
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
							<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
								{t('Templates.nameTitle')}
							</Text>
							<Text fontSize="small" color="neutral.800" textAlign="center">
								{t('Templates.nameDescription')}
							</Text>
							<Box width="100%" style={{ maxWidth: '20.5rem' }}>
								<FormControl name="name">
									<FormControl.Label>
										<RequiredLabel>{t('Templates.name')}</RequiredLabel>
									</FormControl.Label>
									<TextInput />
									<FormControl.Message />
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
