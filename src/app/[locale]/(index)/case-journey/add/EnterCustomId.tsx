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
import { useCaseJourneyStore } from '@/store/case-journey'
import { useStepsStore } from '@/store/steps'
import { TextInput } from '@/components/inputs/text-input'
import { caseAvailable } from 'api/services/caseFiles'

const formSchema = z
	.object({
		customId: z.string().min(1, { message: 'ValidationMeseges.required' })
	})
	.refine(
		async data => {
			if (data.customId !== '') {
				const response = await caseAvailable(data.customId)
				return response?.data?.available
			}
		},
		{
			message: 'CaseJourney.customIdUnavailable',
			path: ['customId']
		}
	)

type Schema = z.infer<typeof formSchema>

export const EnterCustomId = () => {
	const { type, setType, setCustomId } = useCaseJourneyStore()
	const { setCurrentStep } = useStepsStore()
	const t = useTranslations()

	if (type) {
		setType()
	}

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { customId: '' }
	})

	const { customId } = form.watch()

	const onSubmit = async () => {
		setCustomId(customId)
		setCurrentStep(2)
	}

	return (
		<FormProvider {...form}>
			<form style={{ width: '100%' }} onSubmit={form.handleSubmit(onSubmit)}>
				<ManageJourneyIntroWrapper>
					<Stack gap={6} alignItems="center">
						<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
							{t('CaseJourney.selectCustomIdTitle')}
						</Text>
						<Text fontSize="small" color="neutral.800" textAlign="center">
							{t('CaseJourney.selectCustomIdDescription')}
						</Text>
						<Box width="100%">
							<FormControl name="customId">
								<TextInput placeholder={t('General.caseIdPlaceholder')} />
								<FormControl.Message />
							</FormControl>
						</Box>
					</Stack>
				</ManageJourneyIntroWrapper>
				<Actions />
			</form>
		</FormProvider>
	)
}
