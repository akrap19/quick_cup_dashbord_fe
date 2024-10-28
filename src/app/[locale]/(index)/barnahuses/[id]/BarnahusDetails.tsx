'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Barnahus } from 'api/models/barnahuses/barnahus'
import { ROUTES } from 'parameters'

interface Props {
	barnahus: Barnahus
}

export const BarnahusDetails = ({ barnahus }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: barnahus.name,
		backLabel: 'Barnahuses.back',
		actionButton: <EditButton buttonLabel="Barnahuses.edit" buttonLink={ROUTES.EDIT_BARNAHUS + barnahus.barnahusId} />
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('Barnahuses.barnahusName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{barnahus.name ?? t('Barnahuses.barnahusName') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.barnahusLocation')}</Label>
				<Text fontSize="small" color="neutral.800">
					{barnahus.location ?? t('Barnahuses.barnahusLocation') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Inline gap={4}>
					<Label>{t('Barnahuses.assignedMasterAdmin')}</Label>
				</Inline>
				<Text fontSize="small" color="neutral.800">
					{barnahus.admin ?? t('Barnahuses.assignedMasterAdmin') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.barnahusId')}</Label>
				<Text fontSize="small" color="neutral.800">
					{barnahus.locationCode ?? t('Barnahuses.barnahusId') + t('General.notDefined')}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}
