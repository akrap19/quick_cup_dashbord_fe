import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useManageContent } from '@/store/manage-content'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	contentType: z.string().min(1, { message: 'This field is required' })
})

type Schema = z.infer<typeof formSchema>

export const ManageBarnahusContent = () => {
	const t = useTranslations()
	const { language } = useManageContent()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { contentType: '' }
	})

	const onSubmit = async (data: any) => {
		console.log('data', data)
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingTop={9}>
					<Box padding={6} borderTop="thin" borderColor="neutral.300">
						<Stack gap={8}>
							<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
								{t('General.barnahus')}
							</Text>
							<Stack gap={4}>
								<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
									<RequiredLabel>{t('ManageContent.generalIntroductionTitle')}</RequiredLabel>
								</Text>
								<FormControl name="generalIntrudactionTitle">
									<TextInput placeholder={t('ManageContent.generalIntroductionPlaceholderTitle')} />
									<FormControl.Message />
								</FormControl>
								<Text fontSize="medium" fontWeight="semibold" color="neutral.900">
									<RequiredLabel>{t('ManageContent.generalIntroductionDescription')}</RequiredLabel>
								</Text>
								<FormControl name="generalIntroductionDescription">
									<TextInput placeholder={t('ManageContent.generalIntroductionPlaceholderDescription')} />
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
