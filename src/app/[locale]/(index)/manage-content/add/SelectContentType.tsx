import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { FormControl } from '@/components/inputs/form-control'
import { Select } from '@/components/inputs/select'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useJourneyContentStore } from '@/store/journey-content'
import { useManageContent } from '@/store/manage-content'

const formSchema = z.object({
	contentType: z.string().min(1, { message: 'This field is required' })
})

type Schema = z.infer<typeof formSchema>

export const SelectContentType = () => {
	const { setCurrentStep } = useJourneyContentStore()
	const { setContentType } = useManageContent()
	const t = useTranslations()
	const contentTypeOptions = [
		{ value: '', label: t('ManageContent.selectContentType') },
		{ value: 'barnahus', label: t('General.barnahus') },
		{ value: 'staff', label: t('General.staff') },
		{ value: 'rooms', label: t('General.rooms') }
	]

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { contentType: '' }
	})

	const onSubmit = async (data: any) => {
		setCurrentStep(2)
		setContentType(data.contentType)
	}

	return (
		<FormProvider {...form}>
			<form style={{ width: '100%' }} onSubmit={form.handleSubmit(onSubmit)}>
				<Box
					position="absolute"
					style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '26rem' }}>
					<Stack gap={6} alignItems="center">
						<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
							{t('ManageContent.selectContentTitle')}
						</Text>
						<Text fontSize="small" color="neutral.800" textAlign="center">
							{t.rich('ManageContent.selectContentDescription', {
								// eslint-disable-next-line
								guidelines: chunks => (
									<Text as="span" fontSize="small" fontWeight="semibold">
										{chunks}
									</Text>
								)
							})}
						</Text>
						<Box width="100%">
							<FormControl name="contentType">
								<Select sizes="large" options={contentTypeOptions} />
							</FormControl>
						</Box>
					</Stack>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
