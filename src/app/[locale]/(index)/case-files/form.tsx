'use client'

import { useTranslations } from 'next-intl'

import { InputWithInfo } from '@/components/custom/inputs/input-with-info/InputWithInfo'
import { FormItems } from '@/components/custom/layouts/add-form'
import { Box } from '@/components/layout/box'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'
import { Checkbox } from '@/components/inputs/checkbox'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { InputInfo } from '@/components/inputs/input-info'

interface Props {
	cancelDialog?: OpenedProps
}

const CaseFilesForm = ({ cancelDialog }: Props) => {
	const t = useTranslations()
	// const options = [
	// 	{ id: 'Open', name: t('General.open') },
	// 	{ id: 'InProgress', name: t('General.inProgress') },
	// 	{ id: 'Closed', name: t('General.closed') },
	// 	{ id: 'Other', name: t('General.other') }
	// ]

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
			<InputWithInfo infoText="CaseFiles.barnahusInfoText">
				<FormControl name="barnahus">
					<FormControl.Label>
						<RequiredLabel>{t('General.barnahus')}</RequiredLabel>
					</FormControl.Label>
					<TextInput disabled placeholder={t('General.barnahusPlaceholder')} />
					<FormControl.Message />
				</FormControl>
			</InputWithInfo>
			<Inline gap={5} alignItems="center">
				<Inline gap={2} alignItems="center">
					<Box>
						<FormControl name="canAddNotes">
							<Checkbox />
						</FormControl>
					</Box>
					<Text color="neutral.900" fontWeight="semibold" fontSize="small">
						{t('General.notes')}
					</Text>
				</Inline>
				<Inline alignItems="center">
					<InputInfo infoText="CaseFiles.notesInfoText" />
				</Inline>
			</Inline>
		</FormItems>
	)
}

export default CaseFilesForm
