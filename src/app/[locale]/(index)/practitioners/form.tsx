'use client'

import { useTranslations } from 'next-intl'

import { InputWithInfo } from '@/components/custom/inputs/input-with-info/InputWithInfo'
import { FormItems } from '@/components/custom/layouts/add-form'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'
import { useSearchParams } from 'next/navigation'

interface Props {
	isEdit?: boolean
	cancelDialog?: OpenedProps
}

const PractitionerForm = ({ isEdit, cancelDialog }: Props) => {
	const searchParams = useSearchParams()
	const userProfesionSearchParams = searchParams.get('userProfession')
	const t = useTranslations()
	const options = [
		{ id: 'Coordinator', name: 'Coordinator' },
		{ id: 'Police', name: 'Police' },
		{ id: 'Social services/social worker', name: 'Social services/social worker' },
		{ id: 'Medical doctor', name: 'Medical doctor' },
		{ id: 'Nurse', name: 'Nurse' },
		{ id: 'Other', name: 'Other' }
	]
	const filteredOptions = options.filter(option =>
		option.name.toLocaleLowerCase().includes(userProfesionSearchParams?.toLocaleLowerCase() ?? '')
	)

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<FormControl name="email">
				<FormControl.Label>
					<RequiredLabel>{t('General.email')}</RequiredLabel>
				</FormControl.Label>
				<TextInput disabled={isEdit} type="email" placeholder={t('General.emailPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<InputWithInfo infoText="General.barnahusInfoText">
				<FormControl name="barnahus">
					<FormControl.Label>
						<RequiredLabel>{t('General.barnahus')}</RequiredLabel>
					</FormControl.Label>
					<TextInput disabled placeholder={t('General.barnahusPlaceholder')} />
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
			<FormControl name="userProfession">
				<FormControl.Label>
					<RequiredLabel>{t('General.role')}</RequiredLabel>
				</FormControl.Label>
				<SearchDropdown placeholder="General.role" options={filteredOptions} alwaysShowSearch={true} />
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
