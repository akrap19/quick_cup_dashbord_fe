'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'
import { useStepsStore } from '@/store/steps'
import { areAllItemsEmptyInArrayObject } from '@/utils/areAllItemsEmptyInArrayObject'
import { replaceEmptyStringsWithNull } from '@/utils/replaceEmptyStringsWithNull'
import { ContentPayload } from 'api/models/content/contentPayload'
import { createRoomBulk } from 'api/services/content/rooms'

import { SectionItemsFields } from '../common/SectionItemsFields'
import { TitleSubsection } from '../common/TitleSubsection'

const formSchema = z.object({
	items: z.array(
		z.object({
			title: z.string(),
			description: z.string(),
			audioId: z.string(),
			images: z.array(z.string())
		})
	)
})

type Schema = z.infer<typeof formSchema>

export const ManageRoomsContent = () => {
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
					title: '',
					description: '',
					audioId: '',
					images: []
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
			title: '',
			description: '',
			audioId: '',
			images: [] as any
		})
	}

	const handleRemoveSection = () => {
		// eslint-disable-next-line
		const removeIndex = formData?.items?.length - 1
		remove(removeIndex)
	}

	const handleNextStep = () => {
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
			const result = await createRoomBulk(replaceEmptyStringsWithNull(formDataTmp))

			if (result?.message === 'OK') {
				SuccessToast(t('ManageContent.roomsContentSccessfullyCreated'))

				setIsContentEmpty('rooms', false)
				handleNextStep()
			}
		} else {
			setIsContentEmpty('rooms', true)
			handleNextStep()
		}
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingTop={6}>
					<Stack gap={6}>
						<Box display="flex" justify="center">
							<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
								{t('General.rooms')}
							</Text>
						</Box>
						<Box padding={6} borderTop="thin" borderColor="neutral.300">
							<Stack gap={4}>
								<TitleSubsection
									addButtonLabel="ManageContent.addRoom"
									removeButtonLabel="ManageContent.removeRoom"
									infoText="ManageContent.addRoomInfoText"
									showRemoveButton={formData?.items?.length > 1}
									handleAddSection={handleAddSection}
									handleRemoveSection={handleRemoveSection}
								/>
								{fields.map((field, index) => (
									<div key={field.id}>
										<SectionItemsFields index={index} form={form} />
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
