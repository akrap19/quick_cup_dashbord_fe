'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Service } from 'api/models/services/service'
import { ROUTES } from 'parameters'

interface Props {
	service: Service
}

export const ServiceDetails = ({ service }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: service.name,
		backLabel: 'Services.back',
		actionButton: <EditButton buttonLabel="Services.edit" buttonLink={ROUTES.EDIT_SERVICES + service?.id} />
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('General.name')}</Label>
				<Text fontSize="small" color="neutral.800">
					{service.name}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.description')}</Label>
				<Text fontSize="small" color="neutral.800">
					{service.description ?? t('General.description') + t('General.notDefined')}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}
