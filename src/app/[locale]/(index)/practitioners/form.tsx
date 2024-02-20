'use client'

import { useTranslations } from 'next-intl'

import { InputWithInfo } from '@/components/custom/inputs/input-with-info/InputWithInfo'
import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'

interface Props {
	cancelDialog?: OpenedProps
}

const PractitionerForm = ({ cancelDialog }: Props) => {
	const t = useTranslations()

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<FormControl name="email">
				<FormControl.Label>
					<RequiredLabel>{t('General.email')}</RequiredLabel>
				</FormControl.Label>
				<TextInput type="email" placeholder={t('General.emailPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<InputWithInfo infoText="General.barnahusInfoText">
				<FormControl name="barnahus">
					<FormControl.Label>
						<RequiredLabel>{t('General.barnahus')}</RequiredLabel>
					</FormControl.Label>
					<TextInput placeholder={t('General.barnahusPlaceholder')} />
					<FormControl.Message />
				</FormControl>
			</InputWithInfo>
			<FormControl name="firstName">
				<FormControl.Label>
					<RequiredLabel>{t('General.firstName')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.firstNamePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="lastName">
				<FormControl.Label>
					<RequiredLabel>{t('General.lastName')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.lastNamePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="role">
				<FormControl.Label>
					<RequiredLabel>{t('General.role')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.rolePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="phoneNumber">
				<FormControl.Label>{t('General.phoneNumber')}</FormControl.Label>
				<TextInput placeholder={t('General.phoneNumberPlaceholder')} />
				<FormControl.Message />
			</FormControl>
		</FormItems>
	)
}

export default PractitionerForm
