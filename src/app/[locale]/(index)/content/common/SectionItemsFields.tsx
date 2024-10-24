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

interface Props {
	form: any
	index: number
	initialImagesUrls?: string[]
}

export const SectionItemsFields = ({ index, form, initialImagesUrls }: Props) => {
	const t = useTranslations()

	return (
		<Box paddingRight={16} paddingBottom={6}>
			<Stack gap={6}>
				<Stack gap={4}>
					<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
						<RequiredLabel>{t('General.title')}</RequiredLabel>
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
						<RequiredLabel>{t('General.description')}</RequiredLabel>
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
						<RequiredLabel>{t('ManageContent.audioTranslation')}</RequiredLabel>
					</Text>
					<FormControl {...form.register(`items[${index}].audioId`)}>
						<AudioUpload />
						<FormControl.Message />
					</FormControl>
				</Stack>
				<Stack gap={4}>
					<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
						<RequiredLabel>{t('General.photos')}</RequiredLabel>
					</Text>
					<FormControl {...form.register(`items[${index}].images`)}>
						<PhotoUpload initialImagesUrls={initialImagesUrls} />
						<FormControl.Message />
					</FormControl>
				</Stack>
			</Stack>
		</Box>
	)
}
