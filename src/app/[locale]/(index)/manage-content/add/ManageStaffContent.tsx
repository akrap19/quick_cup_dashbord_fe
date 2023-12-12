import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { PhotoUpload } from '@/components/custom/upload/photo-upload'
import { PlainPlusIcon } from '@/components/icons/plain-plus-icon'
import { Button } from '@/components/inputs/button'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'

const formSchema = z.object({
	generalIntrudactionTitle: z.string().min(1, { message: 'ValidationMeseges.required' })
})

type Schema = z.infer<typeof formSchema>

export const ManageStaffContent = () => {
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
						<Stack gap={6}>
							<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
								{t('General.staff')}
							</Text>
							<Box position="relative">
								<Box position="absolute" style={{ right: '0' }}>
									<Button variant="secondary" size="small">
										<Inline alignItems="center" gap={1}>
											<PlainPlusIcon size="medium" />
											<Text fontWeight="semibold">{t('ManageContent.addStaff')}</Text>
										</Inline>
									</Button>
								</Box>
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
							<Stack gap={4}>
								<Text fontSize="medium" fontWeight="semibold" color="neutral.900" textTransform="uppercase">
									<RequiredLabel>{t('ManageContent.staffDescription')}</RequiredLabel>
								</Text>
								<Box style={{ maxWidth: '30rem' }}>
									<FormControl name="photos" maxLength="30">
										<TextInput placeholder={t('ManageContent.staffDescriptionPlaceholder')} />
										<FormControl.CharactersCount />
										<FormControl.Message />
									</FormControl>
								</Box>
							</Stack>
						</Stack>
					</Box>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
