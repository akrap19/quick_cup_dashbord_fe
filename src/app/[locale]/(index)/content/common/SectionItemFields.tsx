import { useTranslations } from 'next-intl'

import { AudioUpload } from '@/components/custom/upload/audio-upload'
import { PhotoUpload } from '@/components/custom/upload/photo-upload'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Textarea } from '@/components/inputs/text-area'
import { TextInput } from '@/components/inputs/text-input'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'

export const SectionItemFields = () => {
	const t = useTranslations()

	return (
		<Box paddingRight={16}>
			<Stack gap={4}>
				<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
					<RequiredLabel>{t('ManageContent.generalIntroductionTitle')}</RequiredLabel>
				</Text>
				<FormControl name="generalIntrudactionTitle" maxLength="50">
					<TextInput placeholder={t('ManageContent.generalIntroductionPlaceholderTitle')} />
					<FormControl.CharactersCount />
					<FormControl.Message />
				</FormControl>
				<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
					<RequiredLabel>{t('ManageContent.generalIntroductionDescription')}</RequiredLabel>
				</Text>
				<FormControl name="generalIntroductionDescription" maxLength="500">
					<Textarea placeholder={t('ManageContent.generalIntroductionPlaceholderDescription')} />
					<FormControl.CharactersCount />
					<FormControl.Message />
				</FormControl>
				<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
					{t('ManageContent.audioTranslation')}
				</Text>
				<FormControl name="audioTranslate">
					<AudioUpload />
					<FormControl.Message />
				</FormControl>
				<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
					<RequiredLabel>{t('General.photos')}</RequiredLabel>
				</Text>
				<FormControl name="photos">
					<PhotoUpload />
					<FormControl.Message />
				</FormControl>
			</Stack>
		</Box>
	)
}
