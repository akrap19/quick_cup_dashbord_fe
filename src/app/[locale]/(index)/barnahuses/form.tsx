'use client'

import { useTranslations } from 'next-intl'

import { FormItems } from '@/components/custom/layouts/add-form'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'

interface Props {
	cancelDialog?: OpenedProps
}

const BarnahusForm = ({ cancelDialog }: Props) => {
	const t = useTranslations()

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<FormControl name="name">
				<FormControl.Label>
					<RequiredLabel>{t('Barnahuses.barnahusName')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('Barnahuses.barnahusNamePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="location">
				<FormControl.Label>
					<RequiredLabel>{t('Barnahuses.barnahusLocation')}</RequiredLabel>
				</FormControl.Label>
				<SearchDropdown
					dropdownPlaceholder="General.location"
					searchPlaceholder="Barnahuses.barnahusLocation"
					options={[
						{ value: 'osl', label: 'Oslo, Norway' },
						{ value: 'stck', label: 'Stockholm, Sweden' },
						{ value: 'brl', label: 'Berlin, Germany' },
						{ value: 'lnd', label: 'London, England' },
						{ value: 'zg', label: 'Zagreb, Croatia' }
					]}
				/>
				<FormControl.Message />
			</FormControl>
			<FormControl name="id">
				<FormControl.Label>
					<RequiredLabel>{t('General.masterAdmin')}</RequiredLabel>
				</FormControl.Label>
				<SearchDropdown
					dropdownPlaceholder="General.masterAdmin"
					searchPlaceholder="General.masterAdminPlaceholder"
					options={[
						{ value: 'osl', label: 'Oslo, Norway' },
						{ value: 'stck', label: 'Stockholm, Sweden' },
						{ value: 'brl', label: 'Berlin, Germany' },
						{ value: 'lnd', label: 'London, England' },
						{ value: 'zg', label: 'Zagreb, Croatia' }
					]}
				/>
				<FormControl.Message />
			</FormControl>
		</FormItems>
	)
}

export default BarnahusForm
