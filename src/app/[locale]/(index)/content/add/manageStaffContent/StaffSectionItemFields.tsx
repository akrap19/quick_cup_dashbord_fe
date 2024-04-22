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
import { tokens } from '@/style/theme.css'

export const StaffSectionItemFields = () => {
	const t = useTranslations()

	return (
		<Box paddingRight={16}>
			<Stack gap={6}>
				<Box position="relative">
					<Stack gap={4}>
						<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
							<RequiredLabel>{t('ManageContent.staffPhoto')}</RequiredLabel>
						</Text>
						<FormControl name="photos">
							<PhotoUpload />
							<FormControl.Message />
						</FormControl>
					</Stack>
				</Box>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						columnGap: tokens.spacing[6],
						rowGap: tokens.spacing[4]
					}}>
					<Stack gap={4}>
						<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
							<RequiredLabel>{t('ManageContent.staffDescription')}</RequiredLabel>
						</Text>
						<Box>
							<FormControl name="photos" maxLength="30">
								<TextInput placeholder={t('ManageContent.staffDescriptionPlaceholder')} />
								<FormControl.CharactersCount />
								<FormControl.Message />
							</FormControl>
						</Box>
					</Stack>
					<Stack gap={4}>
						<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
							<RequiredLabel>{t('ManageContent.staffDescription')}</RequiredLabel>
						</Text>
						<Box>
							<FormControl name="photos" maxLength="30">
								<TextInput placeholder={t('ManageContent.staffDescriptionPlaceholder')} />
								<FormControl.CharactersCount />
								<FormControl.Message />
							</FormControl>
						</Box>
					</Stack>
				</div>
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
			</Stack>
		</Box>
	)
}
