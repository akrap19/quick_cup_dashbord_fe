'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useManageContentSelection } from '@/store/manage-content-selection'
import { useStepsStore } from '@/store/steps'
import { Staff } from 'api/models/content/staff'
import { requiredString } from 'schemas'

import { SelectStaffContentItem } from './SelectStaffContentItem'
import { StaffTemplate } from 'api/models/template/staffTemplate'
import { Heading } from '@/components/typography/heading'

interface Props {
	staffs?: Staff[]
}

const formSchema = z.object({
	items: z.array(
		z.object({
			staffId: requiredString.shape.scheme,
			includeName: z.boolean(),
			includeDescription: z.boolean(),
			includeImage: z.boolean(),
			includeImages: z.boolean()
		})
	)
})

type Schema = z.infer<typeof formSchema>

export const SelectStaffContent = ({ staffs }: Props) => {
	const { staff, setStaff } = useManageContentSelection()
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()
	const defaultValues = {
		items: staff
			? staff?.map((staffTemplate: StaffTemplate) => ({
					staffId: staffTemplate?.staffId,
					includeName: staffTemplate?.includeName,
					includeDescription: staffTemplate?.includeDescription,
					includeImage: staffTemplate?.includeImage,
					includeImages: staffTemplate?.includeImages
				}))
			: staffs
				? staffs.map((staff: Staff) => ({
						staffId: staff.staffId,
						includeName: false,
						includeDescription: false,
						includeImage: false,
						includeImages: false
					}))
				: []
	}

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const formData = form?.getValues()

	const onSubmit = async () => {
		setStaff(formData?.items)
		if (currentStep) {
			setCurrentStep(currentStep + 1)
		}
	}

	const handleBack = async () => {
		setStaff(formData?.items)
		if (currentStep) {
			setCurrentStep(currentStep - 1)
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
						{staffs && staffs?.length > 0 ? (
							staffs?.map((staff: Staff, i: number) => (
								<SelectStaffContentItem data={staff} form={form} index={i} hideDivider={staffs?.length === i + 1} />
							))
						) : (
							<Box width="100%" display="flex" justify="center" style={{ height: '400px' }}>
								<Stack gap={4} justifyContent="center" alignItems="center">
									<Heading color="neutral.800" variant="h2" lineHeight="medium">
										{t('CaseJourney.noContentTitle')}
									</Heading>
									<Text color="neutral.800" lineHeight="xlarge" textAlign="center">
										{t('CaseJourney.noContentDescription')}
									</Text>
								</Stack>
							</Box>
						)}
					</Stack>
				</Box>
				<Actions customHandleBack={handleBack} />
			</form>
		</FormProvider>
	)
}
