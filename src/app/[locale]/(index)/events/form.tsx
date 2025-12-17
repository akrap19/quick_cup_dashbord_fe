'use client'

import { useTranslations } from 'next-intl'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Textarea } from '@/components/inputs/text-area'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'
import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'
import { Clients } from 'api/models/clients/clients'

interface Props {
	isClient: boolean
	cancelDialog?: OpenedProps
	clients: Clients[]
}

const EventForm = ({ cancelDialog, clients, isClient }: Props) => {
	const t = useTranslations()
	const transformedClientArray = clients?.map((client: Clients) => {
		return {
			id: client.userId,
			name: client.name
		}
	})

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<FormControl name="title">
				<FormControl.Label>
					<RequiredLabel>{t('General.name')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.namePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			{!isClient ? (
				<FormControl name="userId">
					<FormControl.Label>{t('General.owner')}</FormControl.Label>
					<SearchDropdown placeholder="General.ownerPlaceholder" options={transformedClientArray} alwaysShowSearch />
				</FormControl>
			) : (
				<div />
			)}
			<FormControl name="location">
				<FormControl.Label>
					<RequiredLabel>{t('General.location')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('Events.locationPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="place">
				<FormControl.Label>
					<RequiredLabel>{t('General.placeAndPostalCode')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.placeAndPostalCodePlaceholder')} autoComplete="off" />
				<FormControl.Message />
			</FormControl>
			<FormControl name="street">
				<FormControl.Label>
					<RequiredLabel>{t('General.streetAndNumber')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.streetAndNumberPlaceholder')} autoComplete="off" />
				<FormControl.Message />
			</FormControl>
			<div />
			<FormControl name="startDate">
				<FormControl.Label>
					<RequiredLabel>{t('Events.startDate')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('Events.startDatePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="endDate">
				<FormControl.Label>
					<RequiredLabel>{t('Events.endDate')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('Events.endDatePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="description" maxLength="500">
				<FormControl.Label>
					<RequiredLabel>{t('General.description')}</RequiredLabel>
				</FormControl.Label>
				<Textarea placeholder={t('General.descriptionPlaceholder')} rows={4} />
				<FormControl.Message />
			</FormControl>
		</FormItems>
	)
}

export default EventForm
