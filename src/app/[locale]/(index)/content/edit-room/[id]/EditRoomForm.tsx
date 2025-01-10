'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { Box } from '@/components/layout/box'
import { useStepsStore } from '@/store/steps'
import { removeHtmlTags } from '@/utils/removeHtmlTags'
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull'
import { Room } from 'api/models/content/room'

import { SectionItemFields } from '../../common/SectionItemFields'
import { Language } from 'api/models/language/language'
import { useManageContentAdd } from '@/store/manage-content-add'
import { LanguageLabel } from '../../common/LanguageLabel'
import { Audio } from 'api/models/common/audio'

interface Props {
	room: Room
	language: Language
}

const formSchema = z.object({
	title: z.string().nullable(),
	description: z.string().nullable(),
	audioId: z.string().nullable(),
	images: z.array(z.string())
})

type Schema = z.infer<typeof formSchema>

export const EditRoomForm = ({ room, language }: Props) => {
	const { currentStep, setCurrentStep } = useStepsStore()
	const {
		rooms,
		imagesToDisplay,
		audioToDisplay,
		setRooms,
		setImagesToDisplay,
		setAudioToDisplay,
		removeaudioByLanguageId,
		removeAboutsByTranslationId
	} = useManageContentAdd()
	const defaultImageIds = room?.roomImages?.map(roomImage => roomImage?.mediaId)

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues:
			rooms && rooms[0]
				? {
						title: rooms[0]?.title ?? '',
						description: rooms[0]?.description ?? '',
						audioId: rooms[0]?.audioId ?? '',
						images: rooms[0]?.images ?? []
					}
				: {
						title: room?.title ?? '',
						description: room?.description ?? '',
						audioId: room?.audio?.id ?? '',
						images: defaultImageIds ?? []
					}
	})

	const formData = form?.getValues()

	const onSubmit = async () => {
		// its for bug, it doesnt know that image was changed
		const { images } = form.watch()
		const deletedImages = defaultImageIds?.filter(id => !images.includes(id))
		const uniqueImages = images?.filter(item => !defaultImageIds?.includes(item))

		const roomForEdit = {
			roomTranslationId: room?.roomTranslationId,
			title: replaceEmptyStringWithNull(formData.title),
			description: removeHtmlTags(formData.description) ? formData.description : null,
			images: uniqueImages,
			deletedImages,
			audioId: replaceEmptyStringWithNull(formData.audioId)
		}

		removeAboutsByTranslationId(room?.roomTranslationId)
		setRooms(roomForEdit)
		setCurrentStep(2)
	}

	const onPhotosChange = (photos: string[]) => {
		setImagesToDisplay(photos)
	}

	const onAudioChange = (audio: Audio | undefined) => {
		if (currentStep) {
			removeaudioByLanguageId(language?.languageId)
			if (audio) {
				setAudioToDisplay(language?.languageId, audio)
			}
		}
	}

	return (
		<Box paddingTop={6}>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<LanguageLabel language={language?.name} />
					<SectionItemFields
						initialAudio={audioToDisplay[0]?.audio}
						onAudioChangeFull={onAudioChange}
						initialImagesUrls={imagesToDisplay}
						onPhotosChange={onPhotosChange}
					/>
					<Actions />
				</form>
			</FormProvider>
		</Box>
	)
}
