import { zodResolver } from '@hookform/resolvers/zod'
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
import { useCaseJourneyStore } from '@/store/case-journey'
import { useStepsStore } from '@/store/steps'
import { Base } from 'api/models/common/base'

interface Props {
	caseFiles: Base[]
}

const formSchema = z.object({
	customId: z.string().min(1, { message: 'ValidationMeseges.required' })
})

type Schema = z.infer<typeof formSchema>

export const SelectCaseId = ({ caseFiles }: Props) => {
	const { setCustomId } = useCaseJourneyStore()
	const { setCurrentStep } = useStepsStore()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { customId: '' }
	})

	const onSubmit = async (data: Schema) => {
		setCustomId(data.customId)
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
								<SearchDropdown placeholder="CaseFiles.customId" options={caseFiles} isFilter />
							</FormControl>
						</Box>
					</Stack>
				</ManageJourneyIntroWrapper>
				<Actions />
			</form>
		</FormProvider>
	)
}
