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
import { Room } from 'api/models/content/room'
import { requiredString } from 'schemas'

import { SelectContentItem } from './SelectContentItem'
import { RoomTemplate } from 'api/models/template/roomTemplate'
import { Heading } from '@/components/typography/heading'

interface Props {
	defaultRooms: Room[]
}

const formSchema = z.object({
	items: z.array(
		z.object({
			roomId: requiredString.shape.scheme,
			includeAudio: z.boolean(),
			includeDescription: z.boolean(),
			includeImage: z.boolean(),
			includeImages: z.boolean(),
			orderNumber: z.number()
		})
	)
})

type Schema = z.infer<typeof formSchema>

export const SelectRoomsContent = ({ defaultRooms }: Props) => {
	const { rooms, setRooms } = useManageContentSelection()
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()
	const defaultValues = {
		items: rooms
			? rooms?.map((RoomTemplate: RoomTemplate, i: number) => ({
					roomId: RoomTemplate?.roomId,
					includeAudio: RoomTemplate?.includeAudio,
					includeDescription: RoomTemplate?.includeDescription,
					includeImage: RoomTemplate?.includeImage,
					includeImages: RoomTemplate?.includeImages,
					orderNumber: i + 1
				}))
			: defaultRooms.map((room: Room, i: number) => ({
					roomId: room.roomId,
					includeAudio: false,
					includeDescription: false,
					includeImage: false,
					includeImages: false,
					orderNumber: i + 1
				}))
	}

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const formData = form?.getValues()

	const onSubmit = async () => {
		setRooms(formData?.items)
		if (currentStep) {
			setCurrentStep(currentStep + 1)
		}
	}

	const handleBack = async () => {
		setRooms(formData?.items)
		if (currentStep) {
			setCurrentStep(currentStep - 1)
		}
	}

	return (
		<FormProvider {...form}>
			<form style={{ width: '100%' }} onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingX={6} paddingY={8} display="flex" justify="center" width="100%">
					<Stack gap={6} alignItems="center">
						<Text color="neutral.800" fontSize="xbig" fontWeight="semibold" textAlign="center">
							{t('CaseJourney.selectRoomsContentTitle')}
						</Text>
						<Box
							style={{
								maxWidth: '26rem'
							}}>
							<Text color="neutral.800" fontSize="small" textAlign="center">
								{t('CaseJourney.selectRoomsContentDescription')}
							</Text>
						</Box>
					</Stack>
				</Box>
				<Box padding={6} borderTop="thin" borderColor="neutral.300">
					<Stack gap={6}>
						{defaultRooms && defaultRooms?.length > 0 ? (
							defaultRooms?.map((room: Room, i: number) => (
								<SelectContentItem data={room} form={form} index={i} hideDivider={defaultRooms?.length === i + 1} />
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
