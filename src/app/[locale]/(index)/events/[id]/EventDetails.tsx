'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { Box } from '@/components/layout/box'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Event } from 'api/models/event/event'
import { ROUTES } from 'parameters'
import { formatDate } from '@/utils/formatDate'

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
				<Label>{t('General.owner')}</Label>
				<Text fontSize="small" color="neutral.800">
					{event.userName ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.location')}</Label>
				<Text fontSize="small" color="neutral.800">
					{event.location ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.placeAndPostalCode')}</Label>
				<Text fontSize="small" color="neutral.800">
					{event.place ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.streetAndNumber')}</Label>
				<Text fontSize="small" color="neutral.800">
					{event.street ?? '-'}
				</Text>
			</Stack>
			<div />
			<Stack gap={4}>
				<Label>{t('Events.startDate')}</Label>
				<Text fontSize="small" color="neutral.800">
					{event.startDate ? formatDate(event.startDate) : '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Events.endDate')}</Label>
				<Text fontSize="small" color="neutral.800">
					{event.endDate ? formatDate(event.endDate) : '-'}
				</Text>
			</Stack>
			<Box style={{ gridColumn: 'span 2' }}>
				<Stack gap={4}>
					<Label>{t('General.description')}</Label>
					<Text fontSize="small" color="neutral.800">
						{event.description ?? '-'}
					</Text>
				</Stack>
			</Box>
		</DetailsWrapper>
	)
}
