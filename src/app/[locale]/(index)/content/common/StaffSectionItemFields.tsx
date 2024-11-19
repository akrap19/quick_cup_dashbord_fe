'use client'

import { useTranslations } from 'next-intl'

import { PhotoUpload } from '@/components/custom/upload/photo-upload'
import { FormControl } from '@/components/inputs/form-control'
import { RichTextEditor } from '@/components/inputs/rich-text-editor'
import { TextInput } from '@/components/inputs/text-input'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { tokens } from '@/style/theme.css'
import { Inline } from '@/components/layout/inline'
import { InputInfo } from '@/components/inputs/input-info'

interface Props {
	initialImagesUrls?: string[]
	includePhotoInfo?: boolean
	onPhotosChange?: (photos: string[]) => void
}

export const StaffSectionItemFields = ({ initialImagesUrls, includePhotoInfo, onPhotosChange }: Props) => {
	const t = useTranslations()

	return (
		<Box paddingRight={16}>
			<Stack gap={6}>
				<Box position="relative">
					<Stack gap={4}>
						<Inline gap={4} alignItems="center">
							<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
								{t('ManageContent.staffPhoto')}
							</Text>
							{includePhotoInfo && <InputInfo infoText={'ManageContent.addPhotoInfo'} />}
						</Inline>
						<FormControl name="images">
							<PhotoUpload initialImagesUrls={initialImagesUrls} onPhotosChange={onPhotosChange} />
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
							<FormControl name="name" maxLength="30">
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
							<FormControl name="title" maxLength="30">
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
						<FormControl name="description" maxLength="500">
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
