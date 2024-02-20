'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { InputWithInfo } from '@/components/custom/inputs/input-with-info/InputWithInfo'
import { FormItems, FormWrapper } from '@/components/custom/layouts/add-form'
import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'
import { Checkbox } from '@/components/inputs/checkbox'
import { FormControl } from '@/components/inputs/form-control'
import { InputInfo } from '@/components/inputs/input-info'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { Box } from '@/components/layout/box'
import { Columns } from '@/components/layout/columns'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { createLanguage } from 'api/services/languages'
import { ROUTES } from 'parameters'
import { requiredString } from 'schemas'

const formSchema = z.object({
	name: requiredString.shape.scheme,
	autoTranslate: z.boolean()
})

type Schema = z.infer<typeof formSchema>

const AddLanguagePage = () => {
	const t = useTranslations()
	const { push } = useRouter()
	const cancelDialog = useOpened()
	useNavbarItems({ title: 'Languages.add', backLabel: 'Languages.back', cancelDialog })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { name: '', autoTranslate: true }
	})

	const onSubmit = async (data: Schema) => {
		const result = await createLanguage(data)
		if (result?.message === 'OK') {
			SuccessToast(t('Languages.successfullyCreated'))
			push(ROUTES.MASTER_ADMINS)
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormItems openCancelDialog={cancelDialog.toggleOpened}>
							<Columns>
								<Columns.Item columns={6}>
									<Stack gap={7}>
										<Stack gap={8}>
											<FormControl name="language">
												<FormControl.Label>
													<RequiredLabel>{t('General.language')}</RequiredLabel>
												</FormControl.Label>
												<SearchDropdown
													dropdownPlaceholder="General.language"
													searchPlaceholder="General.language"
													options={[]}
												/>
												<FormControl.Message />
											</FormControl>
											<InputWithInfo infoText="Languages.statusInfoText">
												<FormControl name="status">
													<FormControl.Label>
														<RequiredLabel>{t('General.status')}</RequiredLabel>
													</FormControl.Label>
													<TextInput defaultValue={t('General.inactive')} disabled />
													<FormControl.Message />
												</FormControl>
											</InputWithInfo>
										</Stack>
										<Inline gap={5} alignItems="center">
											<Inline gap={2} alignItems="center">
												<Box>
													<FormControl name="language">
														<Checkbox />
													</FormControl>
												</Box>
												<Text color="neutral.900" fontWeight="semibold" fontSize="small">
													{t('Languages.autoTranslate')}
												</Text>
											</Inline>
											<Inline alignItems="center">
												<InputInfo infoText="Languages.autoTranslateInfoText" />
											</Inline>
										</Inline>
									</Stack>
								</Columns.Item>
							</Columns>
						</FormItems>
					</form>
				</FormProvider>
			</FormWrapper>
			<CancelAddDialog cancelDialog={cancelDialog} title="Languages.cancelAdd" values={form.getValues()} />
		</>
	)
}

export default AddLanguagePage
