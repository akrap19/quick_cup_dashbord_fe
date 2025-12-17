'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Event } from 'api/models/event/event'
import { ROUTES } from 'parameters'

interface Props {
	event: Event
}

export const EventDetails = ({ event }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: event.title,
		backLabel: 'Events.back',
		actionButton: <EditButton buttonLabel="Events.edit" buttonLink={ROUTES.EDIT_EVENTS + event?.id} />
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('General.name')}</Label>
				<Text fontSize="small" color="neutral.800">
					{event.title}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.location')}</Label>
				<Text fontSize="small" color="neutral.800">
					{event.location ?? t('General.location') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.placeAndPostalCode')}</Label>
				<Text fontSize="small" color="neutral.800">
					{event.place ?? t('General.placeAndPostalCode') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.streetAndNumber')}</Label>
				<Text fontSize="small" color="neutral.800">
					{event.street ?? t('General.streetAndNumber') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4} style={{ width: '100%' }}>
				<Label>{t('General.owner')}</Label>
				<Text fontSize="small" color="neutral.800">
					{event.userId ?? t('General.owner') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Events.startDate')}</Label>
				<Text fontSize="small" color="neutral.800">
					{event.startDate ?? t('Events.startDate') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Events.endDate')}</Label>
				<Text fontSize="small" color="neutral.800">
					{event.endDate ?? t('Events.endDate') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.description')}</Label>
				<Text fontSize="small" color="neutral.800">
					{event.description ?? t('General.description') + t('General.notDefined')}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}
