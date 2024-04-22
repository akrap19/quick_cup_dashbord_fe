'use client'

import { useTranslations } from 'next-intl'

import { FormItems } from '@/components/custom/layouts/add-form'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'
import { Admins } from 'api/models/admin/Admins'
import { Base } from 'api/models/common/base'

interface Props {
	locations: Base[]
	masterAdmins: Admins[]
	cancelDialog?: OpenedProps
}

const BarnahusForm = ({ locations, masterAdmins, cancelDialog }: Props) => {
	const t = useTranslations()
	const transformedLocationsArray = locations?.map(location => {
		return {
			id: location.name,
			name: location.name
		}
	})
	const transformedMasterAdminsArray = masterAdmins?.map(masterAdmin => {
		return {
			id: masterAdmin.userId,
			name: masterAdmin.name
		}
	})

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
				<SearchDropdown placeholder="Barnahuses.barnahusLocation" options={transformedLocationsArray} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="masterAdmin">
				<FormControl.Label>
					<RequiredLabel>{t('General.masterAdmin')}</RequiredLabel>
				</FormControl.Label>
				<SearchDropdown placeholder="General.masterAdminPlaceholder" options={transformedMasterAdminsArray} />
				<FormControl.Message />
			</FormControl>
		</FormItems>
	)
}

export default BarnahusForm
