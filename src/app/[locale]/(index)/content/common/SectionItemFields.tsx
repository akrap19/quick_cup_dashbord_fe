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

interface Props {
	form: any
	index: number
}

export const SectionItemFields = ({ index, form }: Props) => {
	const t = useTranslations()

	return (
		<Box paddingRight={16} paddingBottom={6} borderBottom="thin" borderColor="neutral.300">
			<Stack gap={6}>
				<Stack gap={4}>
					<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
						<RequiredLabel>{t('ManageContent.generalIntroductionTitle')}</RequiredLabel>
					</Text>
					<FormControl
						{...form.register(`items[${index}].generalIntroductionTitle`)}
						errorMessageString={
							form.formState.errors?.items && form.formState.errors?.items[index]?.generalIntroductionTitle?.message
						}
						maxLength="50">
						<TextInput placeholder={t('ManageContent.generalIntroductionPlaceholderTitle')} />
						<FormControl.CharactersCount />
						<FormControl.Message />
					</FormControl>
				</Stack>
				<Stack gap={4}>
					<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
						<RequiredLabel>{t('ManageContent.generalIntroductionDescription')}</RequiredLabel>
					</Text>
					<FormControl
						{...form.register(`items[${index}].generalIntroductionDescription`)}
						errorMessageString={
							form.formState.errors?.items &&
							form.formState.errors?.items[index]?.generalIntroductionDescription?.message
						}
						maxLength="500">
						<Textarea placeholder={t('ManageContent.generalIntroductionPlaceholderDescription')} />
						<FormControl.CharactersCount />
						<FormControl.Message />
					</FormControl>
				</Stack>
				<Stack gap={4}>
					<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
						{t('ManageContent.audioTranslation')}
					</Text>
					<FormControl {...form.register(`items[${index}].audioTranslate`)}>
						<AudioUpload />
						<FormControl.Message />
					</FormControl>
				</Stack>
				<Stack gap={4}>
					<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
						<RequiredLabel>{t('General.photos')}</RequiredLabel>
					</Text>
					<FormControl {...form.register(`items[${index}].photos`)}>
						<PhotoUpload />
						<FormControl.Message />
					</FormControl>
				</Stack>
			</Stack>
		</Box>
	)
}
