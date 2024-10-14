'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { Box } from '@/components/layout/box'
import { Text } from '@/components/typography/text'
import { Stack } from '@/components/layout/stack'
import { useStepsStore } from '@/store/steps'
import { requiredString } from 'schemas'
import { Staff } from 'api/models/content/staff'
import { SelectStaffContentItem } from './SelectStaffContentItem'
import { useManageTemplate } from '@/store/manage-template'

interface Props {
	staffs: Staff[]
}

const formSchema = z.object({
	items: z.array(
		z.object({
			staffId: requiredString.shape.scheme,
			includeName: z.boolean(),
			includeDescription: z.boolean(),
			includeImage: z.boolean()
		})
	)
})

type Schema = z.infer<typeof formSchema>

export const SelectStaffContent = ({ staffs }: Props) => {
	const { setStaff } = useManageTemplate()
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()
	const defaultValues = {
		items: staffs.map((staff: Staff) => ({
			staffId: staff.staffId,
			includeName: false,
			includeDescription: false,
			includeImage: false
		}))
	}

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const onSubmit = async (data: Schema) => {
		setStaff(data?.items)
		if (currentStep) {
			setCurrentStep(currentStep + 1)
		}
	}

	return (
		<FormProvider {...form}>
			<form style={{ width: '100%' }} onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingX={6} paddingY={8} display="flex" justify="center" width="100%">
					<Stack gap={6}>
						<Text color="neutral.800" fontSize="xbig" fontWeight="semibold" textAlign="center">
							{t('CaseJourney.selectStaffContentTitle')}
						</Text>
						<Box
							style={{
								maxWidth: '26rem'
							}}>
							<Text color="neutral.800" fontSize="small" textAlign="center">
								{t('CaseJourney.selectStaffContentDescription')}
							</Text>
						</Box>
					</Stack>
				</Box>
				<Box padding={6} borderTop="thin" borderColor="neutral.300">
					<Stack gap={6}>
						{staffs?.map((staff: Staff, i: number) => (
							<SelectStaffContentItem data={staff} form={form} index={i} hideDivider={staffs?.length === i + 1} />
						))}
					</Stack>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
