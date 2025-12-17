'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { ServiceLocation } from 'api/models/service-locations/serviceLocation'
import { ROUTES } from 'parameters'

interface Props {
	serviceLocation: ServiceLocation
	serviceId: string
}

export const ServiceLocationDetails = ({ serviceLocation, serviceId }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: serviceLocation.city || 'ServiceLocations.details',
		backLabel: 'ServiceLocations.back',
		actionButton: (
			<EditButton
				buttonLabel="ServiceLocations.edit"
				buttonLink={ROUTES.EDIT_SERVICE_LOCATION.replace('{id}', serviceId) + serviceLocation?.id}
			/>
		)
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('General.city')}</Label>
				<Text fontSize="small" color="neutral.800">
					{serviceLocation.city}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.address')}</Label>
				<Text fontSize="small" color="neutral.800">
					{serviceLocation.address}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.phoneNumber')}</Label>
				<Text fontSize="small" color="neutral.800">
					{serviceLocation.phone}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.email')}</Label>
				<Text fontSize="small" color="neutral.800">
					{serviceLocation.email}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}
