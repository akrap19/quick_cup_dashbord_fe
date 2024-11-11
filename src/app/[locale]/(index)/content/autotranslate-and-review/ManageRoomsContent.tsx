import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'
import { useStepsStore } from '@/store/steps'
import { Room } from 'api/models/content/room'

import { LanguageLabel } from '../common/LanguageLabel'
import { SectionItemsFields } from '../common/SectionItemsFields'
import { ContentPayload } from 'api/models/content/contentPayload'
import { areAllItemsEmptyInArrayObject } from '@/utils/areAllItemsEmptyInArrayObject'
import { useRouter } from 'next/navigation'
import { replaceEmptyStringsWithNull } from '@/utils/replaceEmptyStringsWithNull'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { createRoomBulk } from 'api/services/content/rooms'

interface Props {
	rooms?: Room[]
}

const formSchema = z.object({
	items: z.array(
		z.object({
			roomId: z.string(),
			title: z.string(),
			description: z.string(),
			audioId: z.string(),
			images: z.array(z.string()),
			deletedImages: z.array(z.string())
		})
	)
})

type Schema = z.infer<typeof formSchema>

export const ManageRoomsContent = ({ rooms }: Props) => {
	const { currentStep, setCurrentStep } = useStepsStore()
	const { language, setIsContentEmpty } = useManageContent()
	const { refresh } = useRouter()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			items: rooms?.map(room => {
				return {
					roomId: room?.roomId ?? '',
					title: room?.title ?? '',
					description: room?.description ?? '',
					audioId: room?.audio?.audioId ?? '',
					images: room?.roomImages?.map(image => image?.roomImageId) ?? [],
					deletedImages: []
				}
			})
		}
	})
	const formData = form?.getValues()

	const { fields } = useFieldArray({
		control: form.control,
		name: 'items'
	})

	const handleNextStep = () => {
		if (currentStep) {
			setCurrentStep(currentStep + 1)
		}
	}

	const handleRoomImagesId = (roomId?: string, imagesIds?: string[]) => {
		const roomImagesIds = rooms?.find(room => room?.roomId === roomId)?.roomImages?.map(image => image?.roomImageId)
		const newImagesIds = imagesIds?.filter(id => !roomImagesIds?.includes(id))

		return newImagesIds
	}

	const handleDeletedRoomImagesId = (roomId?: string, imagesIds?: string[]) => {
		const roomImagesIds = rooms?.find(room => room?.roomId === roomId)?.roomImages?.map(image => image?.roomImageId)

		const deletedImagesIds = roomImagesIds?.filter(id => !imagesIds?.includes(id))

		return deletedImagesIds
	}

	const onSubmit = async () => {
		const formDataTmp: ContentPayload[] = [...formData.items]
		const formValuesCheck = areAllItemsEmptyInArrayObject(formDataTmp)
		formDataTmp.forEach(obj => {
			// eslint-disable-next-line
			obj.languageId = language?.id
			// eslint-disable-next-line
			obj.deletedImages = handleDeletedRoomImagesId(obj.roomId, obj.images)
			// eslint-disable-next-line
			obj.images = handleRoomImagesId(obj.roomId, obj.images)
		})

		if (!formValuesCheck) {
			const result = await createRoomBulk(replaceEmptyStringsWithNull(formDataTmp))

			if (result?.message === 'OK') {
				SuccessToast(t('ManageContent.roomsContentSccessfullyCreated'))

				refresh()
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
						<Stack gap={4}>
							<Box display="flex" justify="center">
								<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
									{t('General.rooms')}
								</Text>
							</Box>
						</Stack>
						<Box padding={6} borderTop="thin" borderColor="neutral.300">
							<Stack gap={4}>
								<LanguageLabel language={language?.name} />
								{fields.map((field, index) => (
									<div key={field.id}>
										{rooms && (
											<SectionItemsFields
												index={index}
												form={form}
												initialAudio={{
													id: rooms[index]?.audio?.audioId ?? '',
													name: rooms[index]?.audio?.audioName ?? '',
													url: rooms[index]?.audio?.audioURL ?? ''
												}}
												initialImagesUrls={rooms[index]?.roomImages?.map(image => image.url)}
											/>
										)}
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
