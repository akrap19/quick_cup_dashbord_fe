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
import { replaceEmptyStringsWithNull } from '@/utils/replaceEmptyStringsWithNull'
import { Audio } from 'api/models/common/audio'
import { Divider } from '@/components/layout/divider'

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
	const key = 'rooms'
	const { currentStep, setCurrentStep } = useStepsStore()
	const {
		language,
		contentPayload,
		audioToDisplay,
		imagesToDisplay,
		setIsContentEmpty,
		setContentPayload,
		setImagesToDisplay,
		setAudioToDisplay
	} = useManageContent()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			items: contentPayload?.rooms
				? contentPayload?.rooms?.map((room, index) => {
						return {
							roomId: (rooms && rooms[index]?.roomId) ?? '',
							title: room?.title ?? '',
							description: room?.description ?? '',
							audioId: room?.audioId ?? '',
							images: room?.images ?? [],
							deletedImages: room?.deletedImages ?? []
						}
					})
				: rooms?.map(room => {
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
			setContentPayload(key, replaceEmptyStringsWithNull(formDataTmp))
			setIsContentEmpty(key, false)
		} else {
			setIsContentEmpty(key, true)
		}

		handleNextStep()
	}

	const onPhotosChange = (id: string, images: string[]) => {
		setImagesToDisplay(id + key, images)
	}

	const onAudioChange = (id: string, audio: Audio) => {
		setAudioToDisplay(id + key, audio)
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
												initialAudio={
													audioToDisplay?.find(audio => audio?.id === `items[${index}].audioId` + key)?.audio ?? {
														id: rooms[index]?.audio?.audioId ?? '',
														name: rooms[index]?.audio?.audioName ?? '',
														url: rooms[index]?.audio?.audioURL ?? ''
													}
												}
												initialImagesUrls={
													imagesToDisplay?.find(images => images?.id === `items[${index}].images` + key)?.images ??
													rooms[index]?.roomImages?.map(image => image.url)
												}
												onAudioChangeFull={onAudioChange}
												onPhotosChange={onPhotosChange}
											/>
										)}
										{index + 1 !== fields?.length && (
											<Box paddingTop={8}>
												<Divider />
											</Box>
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
