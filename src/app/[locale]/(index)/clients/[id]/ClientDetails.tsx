'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { handleFullName } from '@/utils/handleFullName'
import { Client } from 'api/models/clients/client'
import { ROUTES } from 'parameters'
import { Badge } from '@/components/custom/badge/Badge'

interface Props {
	client: Client
}

export const ClientDetails = ({ client }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: handleFullName(client.firstName, client.lastName),
		backLabel: 'Clients.back',
		actionButton: <EditButton buttonLabel="Clients.edit" buttonLink={ROUTES.EDIT_CLIENTS + client.userId} />
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('General.firstName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{client.firstName ?? t('General.firstName') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.lastName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{client.lastName ?? t('General.lastName') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.status')}</Label>
				<Text fontSize="small" color="neutral.800">
					<Badge variant={client.status as any} />
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.location')}</Label>
				<Text fontSize="small" color="neutral.800">
					{client.location ?? t('General.location') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.email')}</Label>
				<Text fontSize="small" color="neutral.800">
					{client.email ?? t('General.email') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.phoneNumber')}</Label>
				<Text fontSize="small" color="neutral.800">
					{client.phoneNumber ?? t('General.phoneNumber') + t('General.notDefined')}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}
