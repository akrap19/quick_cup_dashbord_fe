'use client'

import { useTranslations } from 'next-intl'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'

interface Props {
	isEdit?: boolean
	cancelDialog?: OpenedProps
}

const ServiceLocationForm = ({ isEdit, cancelDialog }: Props) => {
	const t = useTranslations()

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<FormControl name="city">
				<FormControl.Label>
					<RequiredLabel>{t('General.city')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.cityPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="address">
				<FormControl.Label>
					<RequiredLabel>{t('General.address')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.addressPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="phone">
				<FormControl.Label>
					<RequiredLabel>{t('General.phoneNumber')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.phoneNumberPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="email">
				<FormControl.Label>
					<RequiredLabel>{t('General.email')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.emailPlaceholder')} />
				<FormControl.Message />
			</FormControl>
		</FormItems>
	)
}

export default ServiceLocationForm
