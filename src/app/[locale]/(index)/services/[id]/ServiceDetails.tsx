'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { handleFullName } from '@/utils/handleFullName'
import { Service } from 'api/models/services/service'
import { ROUTES } from 'parameters'

interface Props {
	service: Service
}

export const ServiceDetails = ({ service }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: handleFullName(service.firstName, service.lastName),
		backLabel: 'Services.back',
		actionButton: <EditButton buttonLabel="Services.edit" buttonLink={ROUTES.EDIT_SERVICES + service?.userId} />
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('General.firstName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{service.firstName ?? t('General.firstName') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.lastName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{service.lastName ?? t('General.lastName') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.email')}</Label>
				<Text fontSize="small" color="neutral.800">
					{service.email ?? t('General.email') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.phoneNumber')}</Label>
				<Text fontSize="small" color="neutral.800">
					{service.phoneNumber ?? t('General.phoneNumber') + t('General.notDefined')}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}
