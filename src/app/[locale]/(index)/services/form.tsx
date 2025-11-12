'use client'

import { useTranslations } from 'next-intl'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Textarea } from '@/components/inputs/text-area'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'
import { Stack } from 'components/layout/stack/Stack'

interface Props {
	isEdit?: boolean
	cancelDialog?: OpenedProps
}

const ServiceForm = ({ isEdit, cancelDialog }: Props) => {
	const t = useTranslations()

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<Stack gap={6} style={{ width: '50%' }}>
				<FormControl name="name">
					<FormControl.Label>
						<RequiredLabel>{t('General.name')}</RequiredLabel>
					</FormControl.Label>
					<TextInput placeholder={t('General.namePlaceholder')} />
					<FormControl.Message />
				</FormControl>
				<FormControl name="description" maxLength="500">
					<FormControl.Label>
						<RequiredLabel>{t('General.description')}</RequiredLabel>
					</FormControl.Label>
					<Textarea placeholder={t('General.descriptionPlaceholder')} rows={4} />
					<FormControl.Message />
				</FormControl>
			</Stack>
		</FormItems>
	)
}

export default ServiceForm
