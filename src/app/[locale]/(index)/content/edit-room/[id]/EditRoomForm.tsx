'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { requiredString } from 'schemas'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'

import { useStepsStore } from '@/store/steps'
import { Box } from '@/components/layout/box'
import { Actions } from '@/components/custom/layouts/manage-journey'
import { useRouter } from 'next/navigation'
import { SectionItemFields } from '../../common/SectionItemFields'
import { Room } from 'api/models/content/room'
import { updateRoom } from 'api/services/content/rooms'

interface Props {
	room: Room
}

const formSchema = z.object({
	title: requiredString.shape.scheme,
	description: requiredString.shape.scheme,
	audioId: requiredString.shape.scheme,
	images: z.array(z.string()).nonempty()
})

type Schema = z.infer<typeof formSchema>

export const EditRoomForm = ({ room }: Props) => {
	const t = useTranslations()
	const { refresh } = useRouter()
	const { currentStep, setCurrentStep } = useStepsStore()
	const defaultImageIds = room?.roomImages?.map(roomImage => roomImage?.roomImageId)
	const defaultImages = room?.roomImages?.map(roomImage => roomImage?.url)

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: room?.title,
			description: room?.description,
			audioId: room?.audio?.id,
			images: defaultImageIds
		}
	})

	const formData = form?.getValues()

	const onSubmit = async () => {
		// its for bug, it doesnt know that image was changed
		const { images } = form.watch()
		const deletedImages = defaultImageIds.filter(id => !images.includes(id))

		const result = await updateRoom({
			roomTranslationId: room.roomTranslationId,
			title: formData.title,
			description: formData.description,
			images,
			deletedImages: deletedImages,
			audioId: formData.audioId
		})

		if (result?.message === 'OK') {
			refresh()
			SuccessToast(t('ManageContent.roomBarnahusContentSccessfullyCreated'))

			if (currentStep) {
				setCurrentStep(currentStep + 1)
			}
		}
	}

	return (
		<Box paddingTop={6}>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<SectionItemFields initialAudioUrl={room?.audio?.url} initialImagesUrls={defaultImages} />
					<Actions />
				</form>
			</FormProvider>
		</Box>
	)
}
