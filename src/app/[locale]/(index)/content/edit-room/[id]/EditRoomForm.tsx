'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey'
import { Box } from '@/components/layout/box'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useStepsStore } from '@/store/steps'
import { removeHtmlTags } from '@/utils/removeHtmlTags'
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull'
import { Room } from 'api/models/content/room'
import { updateRoom } from 'api/services/content/rooms'
import { ROUTES } from 'parameters'

import { SectionItemFields } from '../../common/SectionItemFields'

interface Props {
	room: Room
}

const formSchema = z.object({
	title: z.string().nullable(),
	description: z.string().nullable(),
	audioId: z.string().nullable(),
	images: z.array(z.string())
})

type Schema = z.infer<typeof formSchema>

export const EditRoomForm = ({ room }: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const { totalSteps, currentStep, setCurrentStep } = useStepsStore()
	const defaultImageIds = room?.roomImages?.map(roomImage => roomImage?.roomImageId)
	const defaultImages = room?.roomImages?.map(roomImage => roomImage?.url)

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
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

		const result = await updateRoom({
			roomTranslationId: room?.roomTranslationId,
			title: replaceEmptyStringWithNull(formData.title),
			description: removeHtmlTags(formData.description) ? formData.description : null,
			images,
			deletedImages,
			audioId: replaceEmptyStringWithNull(formData.audioId)
		})

		if (result?.message === 'OK') {
			refresh()
			SuccessToast(t('ManageContent.roomsContentSccessfullyUpdated'))

			if (currentStep && totalSteps && totalSteps > currentStep) {
				setCurrentStep(currentStep + 1)
			} else {
				push(ROUTES.CONTENT)
			}
		}
	}

	return (
		<Box paddingTop={6}>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<SectionItemFields initialAudio={room?.audio} initialImagesUrls={defaultImages} />
					<Actions />
				</form>
			</FormProvider>
		</Box>
	)
}
