'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { Box } from '@/components/layout/box'
import { useStepsStore } from '@/store/steps'
import { Language } from 'api/models/language/language'

import { SectionItemFields } from '../common/SectionItemFields'
import { translateLanguageContent } from 'api/services/languages'
import { useManageContentAdd } from '@/store/manage-content-add'
import { useEffect, useState } from 'react'
import { ContentPayload } from 'api/models/content/contentPayload'
import { Audio } from 'api/models/common/audio'

interface Props {
	languages: Language[]
}

const formSchema = z.object({
	title: z.string().nullable(),
	description: z.string().nullable(),
	audioId: z.string().nullable(),
	images: z.array(z.string()),
	deletedImages: z.array(z.string())
})

type Schema = z.infer<typeof formSchema>

export const AddRoomForm = ({ languages }: Props) => {
	const {
		rooms,
		imagesToDisplay,
		audioToDisplay,
		setRooms,
		removeRoomsByLanguageId,
		setImagesToDisplay,
		setAudioToDisplay,
		removeaudioByLanguageId
	} = useManageContentAdd()
	const [istranslating, setIsTranslating] = useState(false)
	const [currentAudio, setCurrentAudio] = useState<Audio | undefined>()
	const { totalSteps, currentStep, setCurrentStep } = useStepsStore()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			audioId: '',
			images: [],
			deletedImages: []
		}
	})

	const formData = form?.getValues()

	type FormDataKeys = 'title' | 'description'

	const translate = async (key: FormDataKeys) => {
		const room = rooms?.reduceRight<ContentPayload | null>((found, room) => {
			return found || (room?.languageId === languages[0]?.languageId ? room : null)
		}, null)

		if (
			((formData && formData[key] && formData[key] !== '') || (rooms && room && room[key] && room[key] !== '')) &&
			currentStep
		) {
			const forTranslate = {
				content: currentStep === 1 ? formData[key] : rooms && room ? room[key] : null,
				languageId: languages[currentStep]?.languageId
			}
			const translatedData = await translateLanguageContent(forTranslate)
			const translation = translatedData?.data?.translation

			form.setValue(key, translation)

			return translation
		}

		return ''
	}

	const onSubmit = async () => {
		const { images } = form.watch()
		setIsTranslating(true)
		const isInitalContent = rooms && currentStep && currentStep === 1

		if (currentStep && totalSteps) {
			if (isInitalContent) {
				const initalAudioId = audioToDisplay?.find(audio => audio?.languageId === languages[0]?.languageId)?.audio?.id

				const roomForSave = { ...formData, audioId: initalAudioId, images, languageId: languages[0]?.languageId }
				removeRoomsByLanguageId(languages[0]?.languageId)
				setRooms(roomForSave)
			}

			if (currentStep < languages?.length) {
				const currentAudioId = audioToDisplay?.find(audio => audio?.languageId === languages[currentStep]?.languageId)
					?.audio?.id
				const aboutForSave = {
					title: await translate('title'),
					description: await translate('description'),
					audioId: currentAudioId,
					images,
					languageId: languages[currentStep]?.languageId
				}
				form.setValue('audioId', currentAudioId ?? '')
				removeRoomsByLanguageId(languages[currentStep]?.languageId)
				setRooms(aboutForSave)
			}

			setCurrentAudio(audioToDisplay?.find(audio => audio?.languageId === languages[currentStep]?.languageId)?.audio)
			setIsTranslating(false)
			setCurrentStep(currentStep + 1)
		}
	}

	const onPhotosChange = (photos: string[]) => {
		setImagesToDisplay(photos)
	}

	const onAudioChange = (audio: Audio | undefined) => {
		if (currentStep) {
			removeaudioByLanguageId(languages[currentStep - 1]?.languageId)
			if (audio) {
				setCurrentAudio(audio)
				setAudioToDisplay(languages[currentStep - 1]?.languageId, audio)
			}
		}
	}

	const handleResetForm = (indexOffset: number) => {
		if (currentStep && rooms && rooms[currentStep - indexOffset]) {
			const room = rooms?.reduceRight<ContentPayload | null>((found, room) => {
				return found || (room?.languageId === languages[currentStep - indexOffset]?.languageId ? room : null)
			}, null)

			form.reset({
				title: room?.title ?? '',
				description: room?.description ?? '',
				audioId: room?.audioId ?? '',
				images: room?.images ?? [],
				deletedImages: room?.deletedImages ?? []
			})

			setCurrentAudio(
				audioToDisplay?.find(audio => audio?.languageId === languages[currentStep - indexOffset]?.languageId)?.audio
			)
		}
	}

	const handleBack = () => {
		if (currentStep) {
			handleResetForm(2)
			setCurrentStep(currentStep - 1)
		}
	}

	useEffect(() => {
		handleResetForm(1)
	}, [])

	return (
		<Box paddingTop={6}>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<SectionItemFields
						includePhotoInfo={true}
						initialImagesUrls={imagesToDisplay}
						onPhotosChange={onPhotosChange}
						initialAudio={currentAudio}
						onAudioChangeFull={onAudioChange}
					/>
					<Actions disableSubmit={istranslating} customHandleBack={handleBack} />
				</form>
			</FormProvider>
		</Box>
	)
}
