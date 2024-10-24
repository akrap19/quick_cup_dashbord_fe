import { useTranslations } from 'next-intl'

import { AudioUpload } from '@/components/custom/upload/audio-upload'
import { PhotoUpload } from '@/components/custom/upload/photo-upload'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { RichTextEditor } from '@/components/inputs/rich-text-editor'
import { TextInput } from '@/components/inputs/text-input'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { Audio } from 'api/models/common/audio'

interface Props {
	initialAudio?: Audio
	initialImagesUrls?: string[]
}

export const SectionItemFields = ({ initialAudio, initialImagesUrls }: Props) => {
	const t = useTranslations()

	return (
		<Box paddingRight={16}>
			<Stack gap={6}>
				<Stack gap={4}>
					<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
						<RequiredLabel>{t('General.title')}</RequiredLabel>
					</Text>
					<FormControl name="title" maxLength="50">
						<TextInput placeholder={t('ManageContent.generalIntroductionPlaceholderTitle')} />
						<FormControl.CharactersCount />
						<FormControl.Message />
					</FormControl>
				</Stack>
				<Stack gap={4}>
					<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
						<RequiredLabel>{t('General.description')}</RequiredLabel>
					</Text>
					<FormControl name="description" maxLength="500">
						<RichTextEditor placeholder={t('ManageContent.generalIntroductionPlaceholderDescription')} />
						<FormControl.CharactersCount />
						<FormControl.Message />
					</FormControl>
				</Stack>
				<Stack gap={4}>
					<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
						<RequiredLabel>{t('ManageContent.audioTranslation')}</RequiredLabel>
					</Text>
					<FormControl name="audioId">
						<AudioUpload initialAudio={initialAudio} />
						<FormControl.Message />
					</FormControl>
				</Stack>
				<Stack gap={4}>
					<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
						<RequiredLabel>{t('General.photos')}</RequiredLabel>
					</Text>
					<FormControl name="images">
						<PhotoUpload initialImagesUrls={initialImagesUrls} />
						<FormControl.Message />
					</FormControl>
				</Stack>
			</Stack>
		</Box>
	)
}
