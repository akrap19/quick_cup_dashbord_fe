import { useTranslations } from 'next-intl'

import { PhotoUpload } from '@/components/custom/upload/photo-upload'
import { FormControl } from '@/components/inputs/form-control'
import { RichTextEditor } from '@/components/inputs/rich-text-editor'
import { TextInput } from '@/components/inputs/text-input'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { tokens } from '@/style/theme.css'

interface Props {
	form: any
	index: number
	initialImagesUrls?: string[]
	onPhotosChange: (id: string, photos: string[]) => void
}

export const StaffSectionItemsFields = ({ index, form, initialImagesUrls, onPhotosChange }: Props) => {
	const t = useTranslations()

	return (
		<Box paddingRight={16}>
			<Stack gap={6}>
				<Box position="relative">
					<Stack gap={4}>
						<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
							{t('ManageContent.staffPhoto')}
						</Text>
						<FormControl {...form.register(`items[${index}].images`)}>
							<PhotoUpload
								initialImagesUrls={initialImagesUrls}
								onPhotosChange={images => onPhotosChange(`items[${index}].images`, images)}
							/>
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
							{t('ManageContent.staffName')}
						</Text>
						<Box>
							<FormControl
								{...form.register(`items[${index}].name`)}
								errorMessageString={form.formState.errors?.items && form.formState.errors?.items[index]?.name?.message}
								maxLength="30">
								<TextInput placeholder={t('ManageContent.staffNamePlaceholder')} />
								<FormControl.CharactersCount />
								<FormControl.Message />
							</FormControl>
						</Box>
					</Stack>
					<Stack gap={4}>
						<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
							{t('ManageContent.staffRole')}
						</Text>
						<Box>
							<FormControl
								{...form.register(`items[${index}].title`)}
								errorMessageString={form.formState.errors?.items && form.formState.errors?.items[index]?.titke?.message}
								maxLength="30">
								<TextInput placeholder={t('ManageContent.staffRolePlaceholder')} />
								<FormControl.CharactersCount />
								<FormControl.Message />
							</FormControl>
						</Box>
					</Stack>
				</div>
				<Box paddingTop={4} paddingBottom={8}>
					<Stack gap={4}>
						<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
							{t('ManageContent.staffDescription')}
						</Text>
						<FormControl
							{...form.register(`items[${index}].description`)}
							errorMessageString={
								form.formState.errors?.items && form.formState.errors?.items[index]?.description?.message
							}
							maxLength="500">
							<RichTextEditor placeholder={t('ManageContent.staffDescriptionPlaceholder')} />
							<FormControl.CharactersCount />
							<FormControl.Message />
						</FormControl>
					</Stack>
				</Box>
			</Stack>
		</Box>
	)
}
