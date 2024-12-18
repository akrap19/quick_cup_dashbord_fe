'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts'
import { AudioUpload } from '@/components/custom/upload/audio-upload'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Room, RoomImage } from 'api/models/content/room'
import { ROUTES } from 'parameters'
import { removeHtmlTags } from '@/utils/removeHtmlTags'

interface Props {
	room: Room
}

export const RoomDetails = ({ room }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: room?.title ?? t('General.title') + t('General.notDefined'),
		backLabel: 'ManageContent.back',
		actionButton: (
			<EditButton
				buttonLabel="ManageContent.editRoom"
				buttonLink={`${ROUTES.EDIT_ROOM_CONTENT}/${room.roomTranslationId}`}
			/>
		)
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Stack gap={4}>
					<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
						{t('General.audio')}
					</Text>
					{room?.audio ? (
						<AudioUpload value="audio" initialAudio={room?.audio} disableDelete />
					) : (
						<Text fontSize="small" color="neutral.800">
							{t('General.audio') + t('General.notDefined')}
						</Text>
					)}
				</Stack>
				<Box paddingBottom={8}>
					<Stack gap={6}>
						<Stack gap={4}>
							<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
								{room?.title ?? t('General.title') + t('General.notDefined')}
							</Text>
							<Box paddingRight={20}>
								<Text fontSize="small" color="neutral.800">
									{removeHtmlTags(room?.description) ? (
										<div dangerouslySetInnerHTML={{ __html: room?.description }} />
									) : (
										t('General.description') + t('General.notDefined')
									)}
								</Text>
							</Box>
						</Stack>
						<Stack gap={4}>
							<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
								{t('General.photos')}
							</Text>
							<Inline gap={6}>
								{room?.roomImages?.length > 0 ? (
									room?.roomImages?.map((image: RoomImage) => (
										<Image
											src={image?.url}
											width={212}
											height={212}
											alt="uploadedPhoto"
											style={{ objectFit: 'cover' }}
										/>
									))
								) : (
									<Text fontSize="small" color="neutral.800">
										{t('General.photos') + t('General.notDefined')}
									</Text>
								)}
							</Inline>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</DetailsWrapper>
	)
}
