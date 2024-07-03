'use client'

import { useTranslations } from 'next-intl'

import { InputWithInfo } from '@/components/custom/inputs/input-with-info/InputWithInfo'
import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Select } from '@/components/inputs/select'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'

interface Props {
	cancelDialog?: OpenedProps
}

const CaseFilesForm = ({ cancelDialog }: Props) => {
	const t = useTranslations()

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<FormControl name="caseId">
				<FormControl.Label>
					<RequiredLabel>{t('CaseFiles.customizedId')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.caseIdPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="status">
				<FormControl.Label>
					<RequiredLabel>{t('General.status')}</RequiredLabel>
				</FormControl.Label>
				<Select options={[{ value: '', label: 'Select status' }]} />
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
		</FormItems>
	)
}

export default CaseFilesForm
