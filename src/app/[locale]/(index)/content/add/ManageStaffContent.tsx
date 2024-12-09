'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import qs from 'query-string'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { Box } from '@/components/layout/box'
import { Divider } from '@/components/layout/divider'
import { Stack } from '@/components/layout/stack'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'
import { useStepsStore } from '@/store/steps'
import { areAllItemsEmptyInArrayObject } from '@/utils/areAllItemsEmptyInArrayObject'
import { replaceEmptyStringsWithNull } from '@/utils/replaceEmptyStringsWithNull'
import { ContentPayload } from 'api/models/content/contentPayload'
import { createStaffBulk } from 'api/services/content/staff'

import { StaffSectionItemsFields } from '../common/StaffSectionItemsFields'
import { TitleSubsection } from '../common/TitleSubsection'

const formSchema = z.object({
	items: z.array(
		z.object({
			images: z.array(z.string()),
			name: z.string(),
			title: z.string(),
			description: z.string()
		})
	)
})

type Schema = z.infer<typeof formSchema>

export const ManageStaffContent = () => {
	const searchParams = useSearchParams()
	const { replace, refresh } = useRouter()
	const { currentStep, setCurrentStep } = useStepsStore()
	const { setIsContentEmpty } = useManageContent()
	const { language } = useManageContent()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			items: [
				{
					images: [],
					name: '',
					title: '',
					description: ''
				}
			]
		}
	})

	const formData = form?.getValues()

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items'
	})

	const handleAddSection = () => {
		append({
			images: [] as any,
			name: '',
			title: '',
			description: ''
		})
		SuccessToast(t('General.sectionAddedBelow'))
	}

	const handleRemoveSection = () => {
		// eslint-disable-next-line
		const removeIndex = formData?.items?.length - 1
		remove(removeIndex)
	}

	const handleLocation = (value: string) => {
		const current = qs.parse(searchParams.toString())
		const query = { ...current, languageId: value }
		const url = qs.stringifyUrl(
			{
				url: window.location.href,
				query
			},
			{ skipEmptyString: true }
		)

		replace(url)
	}

	const handleNextStep = () => {
		if (language?.id) {
			handleLocation(language?.id)
		}

		refresh()

		if (currentStep) {
			setCurrentStep(currentStep + 1)
		}
	}

	const onSubmit = async () => {
		const formDataTmp: ContentPayload[] = [...formData.items]
		const formValuesCheck = areAllItemsEmptyInArrayObject(formDataTmp)
		formDataTmp.forEach(obj => {
			// eslint-disable-next-line
			obj.languageId = language?.id
		})

		if (!formValuesCheck) {
			const result = await createStaffBulk(replaceEmptyStringsWithNull(formDataTmp))

			if (result?.message === 'OK') {
				SuccessToast(t('ManageContent.staffContentSccessfullyCreated'))

				setIsContentEmpty('staff', false)
				handleNextStep()
			}
		} else {
			setIsContentEmpty('staff', true)
			handleNextStep()
		}
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingTop={6}>
					<Stack gap={7}>
						<Box display="flex" justify="center">
							<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
								{t('General.staff')}
							</Text>
						</Box>
						<Box paddingX={6} paddingTop={6} borderTop="thin" borderColor="neutral.300">
							<Stack gap={4}>
								<TitleSubsection
									infoText="ManageContent.addStaffInfoText"
									showRemoveButton={formData?.items?.length > 1}
									handleAddSection={handleAddSection}
									handleRemoveSection={handleRemoveSection}
								/>
								{fields.map((field: any, index: number) => (
									<div key={field.id}>
										{index > 0 && (
											<Box paddingBottom={6}>
												<Divider />
											</Box>
										)}
										<StaffSectionItemsFields index={index} form={form} />
									</div>
								))}
							</Stack>
						</Box>
					</Stack>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
