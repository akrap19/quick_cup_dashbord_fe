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

interface Props {
	room: Room
}

export const RoomDetails = ({ room }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: room?.title,
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
				{room?.audio && (
					<Stack gap={4}>
						<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
							{t('General.audio')}
						</Text>
						<AudioUpload initialAudio={room?.audio} />
					</Stack>
				)}
				<Box paddingBottom={8}>
					<Stack gap={6}>
						<Stack gap={4}>
							<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
								{room.title}
							</Text>
							<Box paddingRight={20}>
								<Text fontSize="small" color="neutral.800">
									<div dangerouslySetInnerHTML={{ __html: room?.description }} />
								</Text>
							</Box>
						</Stack>
						<Stack gap={4}>
							<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
								{t('General.photos')}
							</Text>
							<Inline gap={6}>
								{room?.roomImages?.map((image: RoomImage) => (
									<Image src={image?.url} width={212} height={212} alt="uploadedPhoto" style={{ objectFit: 'cover' }} />
								))}
							</Inline>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</DetailsWrapper>
	)
}
