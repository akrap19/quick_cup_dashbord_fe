'use client'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { FormWrapper } from '@/components/custom/form-wrapper/FormWrapper'
import { Select } from '@/components/inputs/select'
import { Text } from '@/components/typography/text'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { InputInfo } from '@/components/inputs/input-info'

const formSchema = z.object({
	barnahusName: z.string().min(1, { message: 'This field is required' }),
	barnahusLocation: z.string().min(1, { message: 'This field is required' })
})

type Schema = z.infer<typeof formSchema>

const AddBarnahusPage = () => {
	const t = useTranslations()
	const defaultValues = { barnahusName: '', barnahusLocation: '' }

	const onSubmit = async (data: Schema) => {
		console.log(data)
	}

	return (
		<FormWrapper formSchema={formSchema} defaultValues={defaultValues} onSubmit={onSubmit}>
			<FormControl name="barnahusName">
				<FormControl.Label>
					<RequiredLabel>{t('Barnahuses.barnahusName')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('Barnahuses.barnahusNamePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="barnahusLocation">
				<FormControl.Label>
					<RequiredLabel>{t('Barnahuses.barnahusLocation')}</RequiredLabel>
				</FormControl.Label>
				<Select options={[]} placeholder={t('Barnahuses.emailPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<Stack gap={4}>
				<Label>
					<InputInfo infoText={'Barnahuses.assignedMasterAdminInfoText'}>
						{t('Barnahuses.assignedMasterAdmin')}
					</InputInfo>
				</Label>
				<Text fontSize="small" color="neutral.300">
					{t('Barnahuses.assignedMasterAdminPlaceholder')}
				</Text>
			</Stack>
		</FormWrapper>
	)
}

export default AddBarnahusPage
