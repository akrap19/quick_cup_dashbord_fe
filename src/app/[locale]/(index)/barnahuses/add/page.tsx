'use client'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { Box } from '@/components/layout/box'
import { Columns } from '@/components/layout/columns'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { FormWrapper } from '@/components/custom/form-wrapper/FormWrapper'

const formSchema = z.object({
	email: z.string().min(1, { message: 'This field is required' }),
	password: z.string().min(1, { message: 'This field is required' })
})

type Schema = z.infer<typeof formSchema>

const AddBarnahusPage = () => {
	const t = useTranslations()

	const onSubmit = async (data: Schema) => {
		console.log(data)
	}
	return (
		<FormWrapper formSchema={formSchema} defaultValues={{ email: '', password: 'aa' }} onSubmit={onSubmit}>
			<Columns.Item columns={6}>
				<Box paddingBottom={3}>
					<FormControl name="email">
						<FormControl.Label>
							<RequiredLabel>{t('General.email')}</RequiredLabel>
						</FormControl.Label>
						<TextInput placeholder={t('General.emailPlaceholder')} />
						<FormControl.Message />
					</FormControl>
				</Box>
			</Columns.Item>
			<Columns.Item columns={6}>
				<Box paddingBottom={3}>
					<FormControl name="email">
						<FormControl.Label>
							<RequiredLabel>{t('General.email')}</RequiredLabel>
						</FormControl.Label>
						<TextInput placeholder={t('General.emailPlaceholder')} />
						<FormControl.Message />
					</FormControl>
				</Box>
			</Columns.Item>
			<Columns.Item columns={6}>
				<FormControl name="email">
					<FormControl.Label>
						<RequiredLabel>{t('General.email')}</RequiredLabel>
					</FormControl.Label>
					<TextInput placeholder={t('General.emailPlaceholder')} />
					<FormControl.Message />
				</FormControl>
			</Columns.Item>
		</FormWrapper>
	)
}

export default AddBarnahusPage
