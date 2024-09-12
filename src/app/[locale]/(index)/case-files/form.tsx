'use client'

import { useTranslations } from 'next-intl'

import { InputWithInfo } from '@/components/custom/inputs/input-with-info/InputWithInfo'
import { FormItems } from '@/components/custom/layouts/add-form'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'

interface Props {
	cancelDialog?: OpenedProps
}

const CaseFilesForm = ({ cancelDialog }: Props) => {
	const t = useTranslations()
	const options = [
		{ id: 'Open', name: t('General.open') },
		{ id: 'InProgress', name: t('General.inProgress') },
		{ id: 'Closed', name: t('General.closed') },
		{ id: 'Other', name: t('General.other') }
	]

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<InputWithInfo infoText="CaseFiles.customizedIdInfoText">
				<FormControl name="customId">
					<FormControl.Label>
						<RequiredLabel>{t('CaseFiles.customizedId')}</RequiredLabel>
					</FormControl.Label>
					<TextInput placeholder={t('General.caseIdPlaceholder')} />
					<FormControl.Message />
				</FormControl>
			</InputWithInfo>
			<FormControl name="status">
				<FormControl.Label>
					<RequiredLabel>{t('General.status')}</RequiredLabel>
				</FormControl.Label>
				<SearchDropdown placeholder="General.status" options={options} />
				<FormControl.Message />
			</FormControl>
			<InputWithInfo infoText="CaseFiles.barnahusInfoText">
				<FormControl name="barnahus">
					<FormControl.Label>
						<RequiredLabel>{t('General.barnahus')}</RequiredLabel>
					</FormControl.Label>
					<TextInput disabled placeholder={t('General.barnahusPlaceholder')} />
					<FormControl.Message />
				</FormControl>
			</InputWithInfo>
		</FormItems>
	)
}

export default CaseFilesForm
