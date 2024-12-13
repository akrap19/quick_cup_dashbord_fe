import { useTranslations } from 'next-intl'

import { AudioUpload } from '@/components/custom/upload/audio-upload'
import { PhotoUpload } from '@/components/custom/upload/photo-upload'
import { FormControl } from '@/components/inputs/form-control'
import { RichTextEditor } from '@/components/inputs/rich-text-editor'
import { TextInput } from '@/components/inputs/text-input'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { Audio } from 'api/models/common/audio'

interface Props {
	form: any
	index: number
	initialAudio?: Audio
	initialImagesUrls?: string[]
	onPhotosChange: (id: string, photos: string[]) => void
	onAudioChangeFull: (id: string, audio: Audio) => void
}

export const SectionItemsFields = ({
	index,
	form,
	initialAudio,
	initialImagesUrls,
	onPhotosChange,
	onAudioChangeFull
}: Props) => {
	const t = useTranslations()

	return (
		<Box paddingRight={16}>
			<Stack gap={6}>
				<Stack gap={4}>
					<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
						{t('General.title')}
					</Text>
					<FormControl
						{...form.register(`items[${index}].title`)}
						errorMessageString={form.formState.errors?.items && form.formState.errors?.items[index]?.title?.message}
						maxLength="50">
						<TextInput placeholder={t('ManageContent.generalIntroductionPlaceholderTitle')} />
						<FormControl.CharactersCount />
						<FormControl.Message />
					</FormControl>
				</Stack>
				<Stack gap={4}>
					<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
						{t('General.description')}
					</Text>
					<FormControl
						{...form.register(`items[${index}].description`)}
						errorMessageString={
							form.formState.errors?.items && form.formState.errors?.items[index]?.description?.message
						}
						maxLength="500">
						<RichTextEditor placeholder={t('ManageContent.generalIntroductionPlaceholderDescription')} />
						<FormControl.CharactersCount />
						<FormControl.Message />
					</FormControl>
				</Stack>
				<Stack gap={4}>
					<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
						{t('ManageContent.audioTranslation')}
					</Text>
					<FormControl {...form.register(`items[${index}].audioId`)}>
						<AudioUpload
							initialAudio={initialAudio}
							onAudioChangeFull={audio => onAudioChangeFull(`items[${index}].audioId`, audio as any)}
						/>
						<FormControl.Message />
					</FormControl>
				</Stack>
				<Stack gap={4}>
					<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
						{t('General.photos')}
					</Text>
					<FormControl {...form.register(`items[${index}].images`)}>
						<PhotoUpload
							initialImagesUrls={initialImagesUrls}
							onPhotosChange={images => onPhotosChange(`items[${index}].images`, images)}
						/>
						<FormControl.Message />
					</FormControl>
				</Stack>
			</Stack>
		</Box>
	)
}
