'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { AudioUpload } from '@/components/custom/upload/audio-upload'
import { Box } from '@/components/layout/box'
import { Text } from '@/components/typography/text'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { About, AboutImage } from 'api/models/content/about'
import { DetailsWrapper } from '@/components/custom/layouts'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { ROUTES } from 'parameters'
import { EditButton } from '@/components/custom/button/edit-button'

interface Props {
	about: About
}

export const AboutDetails = ({ about }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: about?.title,
		backLabel: 'ManageContent.back',
		actionButton: (
			<EditButton
				buttonLabel="ManageContent.editAbout"
				buttonLink={ROUTES.EDIT_ABOUT_CONTENT + '/' + about.aboutTranslationId}
			/>
		)
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				{about?.audio && (
					<Stack gap={4}>
						<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
							{t('General.audio')}
						</Text>
						<AudioUpload initialAudio={about?.audio} />
					</Stack>
				)}
				<Box paddingBottom={8}>
					<Stack gap={6}>
						<Stack gap={4}>
							<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
								{about.title}
							</Text>
							<Box paddingRight={20}>
								<Text fontSize="small" color="neutral.800">
									<div dangerouslySetInnerHTML={{ __html: about?.description }} />
								</Text>
							</Box>
						</Stack>
						<Stack gap={4}>
							<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
								{t('General.photos')}
							</Text>
							<Inline gap={6}>
								{about?.aboutImages?.map((image: AboutImage) => (
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
