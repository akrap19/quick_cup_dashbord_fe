import { Actions } from '@/components/custom/layouts/manage-journey'
import { AudioUpload } from '@/components/custom/upload/audio-upload'
import { PhotoUpload } from '@/components/custom/upload/photo-upload'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Textarea } from '@/components/inputs/text-area'
import { TextInput } from '@/components/inputs/text-input'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	generalIntrudactionTitle: z.string().min(1, { message: 'This field is required' })
})

type Schema = z.infer<typeof formSchema>

export const ManageRoomsContent = () => {
	const t = useTranslations()
	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { generalIntrudactionTitle: '' }
	})
	const formData = form?.getValues()

	const onSubmit = async () => {
		console.log('data', formData)
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingTop={9}>
					<Box padding={6} paddingRight={16} borderTop="thin" borderColor="neutral.300">
						<Stack gap={6}>
							<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
								{t('General.rooms')}
							</Text>
							<Stack gap={4}>
								<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
									<RequiredLabel>{t('ManageContent.waitingRoomTitle')}</RequiredLabel>
								</Text>
								<FormControl name="generalIntrudactionTitle" maxLength={'50'}>
									<TextInput placeholder={t('ManageContent.waitingRoomTitlePlaceholder')} />
									<FormControl.CharactersCount />
									<FormControl.Message />
								</FormControl>
								<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
									<RequiredLabel>{t('ManageContent.waitingRoomDescription')}</RequiredLabel>
								</Text>
								<FormControl name="generalIntroductionDescription" maxLength={'500'}>
									<Textarea placeholder={t('ManageContent.waitingRoomDescriptionPlaceholder')} />
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
									<RequiredLabel>{t('ManageContent.roomPhotos')}</RequiredLabel>
								</Text>
								<FormControl name="photos">
									<PhotoUpload />
									<FormControl.Message />
								</FormControl>
							</Stack>
						</Stack>
					</Box>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
