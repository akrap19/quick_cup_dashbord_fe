'use client'

import { useTranslations } from 'next-intl'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Textarea } from '@/components/inputs/text-area'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'
import { Stack } from '@/components/layout/stack'

interface Props {
	cancelDialog?: OpenedProps
}

const BuyForm = ({ cancelDialog }: Props) => {
	const t = useTranslations()

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<Stack gap={4} style={{ width: '50%' }}>
				<FormControl name="name">
					<FormControl.Label>
						<RequiredLabel>{t('General.name')}</RequiredLabel>
					</FormControl.Label>
					<TextInput placeholder={t('General.namePlaceholder')} />
					<FormControl.Message />
				</FormControl>
				<FormControl name="description">
					<FormControl.Label>{t('General.description')}</FormControl.Label>
					<Textarea placeholder={t('General.descriptionPlaceholder')} rows={4} />
					<FormControl.Message />
				</FormControl>
			</Stack>
		</FormItems>
	)
}

export default BuyForm
