'use client'

import { useTranslations } from 'next-intl'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { InputInfo } from '@/components/inputs/input-info'
import { Label } from '@/components/inputs/label'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { OpenedProps } from '@/hooks/use-toggle'

interface Props {
	cancelDialog?: OpenedProps
}

const MasterAdminForm = ({ cancelDialog }: Props) => {
	const t = useTranslations()

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
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
			<FormControl name="email">
				<FormControl.Label>
					<RequiredLabel>{t('General.email')}</RequiredLabel>
				</FormControl.Label>
				<TextInput type="email" placeholder={t('General.emailPlaceholder')} disabled={!cancelDialog} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="phoneNumber">
				<FormControl.Label>{t('General.phoneNumber')}</FormControl.Label>
				<TextInput placeholder={t('General.phoneNumberPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<Stack gap={4}>
				<Inline alignItems="center" gap={4}>
					<Label>{t('General.barnahus')}</Label>
					<InputInfo infoText="General.assignedBarnahusInfoText" />
				</Inline>
				<Text fontSize="small" color="neutral.300">
					{t('General.assignedBarnahusPlaceholder')}
				</Text>
			</Stack>
		</FormItems>
	)
}

export default MasterAdminForm
