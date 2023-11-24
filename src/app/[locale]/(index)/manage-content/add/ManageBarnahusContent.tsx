import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { AudioUpload } from '@/components/custom/upload/audio-upload'
import { PhotoUpload } from '@/components/custom/upload/photo-upload'
import { FormControl } from '@/components/inputs/form-control'
import { PatternInput } from '@/components/inputs/pattern-input'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Textarea } from '@/components/inputs/text-area'
import { TextInput } from '@/components/inputs/text-input'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { tokens } from '@/style/theme.css'

const formSchema = z.object({
	generalIntrudactionTitle: z.string().min(1, { message: 'This field is required' })
})

type Schema = z.infer<typeof formSchema>

export const ManageBarnahusContent = () => {
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
					<Box padding={6} borderTop="thin" borderColor="neutral.300">
						<Box paddingBottom={6} paddingRight={16} borderBottom="thin" borderColor="neutral.300">
							<Stack gap={6}>
								<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
									{t('General.barnahus')}
								</Text>
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
							</Stack>
						</Box>
						<Box paddingTop={6} paddingRight={16}>
							<Stack gap={4}>
								<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
									{t('ManageContent.workingHours')}
								</Text>
								<div
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(2, 1fr)',
										columnGap: tokens.spacing[6],
										rowGap: tokens.spacing[4]
									}}>
									<Stack gap={4}>
										<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
											<RequiredLabel>{t('ManageContent.mondayToFriday')}</RequiredLabel>
										</Text>
										<FormControl name="mondayToFriday">
											<PatternInput
												format="##:## - ##:##"
												mask="_"
												placeholder={t('ManageContent.mondayToFridayPlaceholder')}
											/>
											<FormControl.Message />
										</FormControl>
									</Stack>
									<Stack gap={4}>
										<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
											<RequiredLabel>{t('ManageContent.saturday')}</RequiredLabel>
										</Text>
										<FormControl name="generalIntrudactionTitle">
											<PatternInput
												format="##:## - ##:##"
												mask="_"
												placeholder={t('ManageContent.saturdayPlaceholder')}
											/>
											<FormControl.Message />
										</FormControl>
									</Stack>
									<Stack gap={4}>
										<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
											<RequiredLabel>{t('ManageContent.sunday')}</RequiredLabel>
										</Text>
										<FormControl name="generalIntrudactionTitle">
											<TextInput placeholder={t('ManageContent.sundayPlaceholder')} />
											<FormControl.Message />
										</FormControl>
									</Stack>
								</div>
							</Stack>
						</Box>
					</Box>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
