'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { InputInfo } from '@/components/inputs/input-info'
import { Label } from '@/components/inputs/label'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'

const BarnahusDetailsPage = () => {
	const t = useTranslations()
	useNavbarItems({
		title: 'Barnahus name',
		backLabel: 'barnahuses',
		actionButton: <EditButton buttonLabel="Barnahuses.edit" buttonLink="/" />
	})

	return (
		<DetailsWrapper>
			<>
				<Label>{t('Barnahuses.barnahusName')}</Label>
				<Text fontSize="small" color="neutral.800">
					Barnahus name
				</Text>
			</>
			<>
				<Label>{t('General.barnahusLocation')}</Label>
				<Text fontSize="small" color="neutral.800">
					{t('General.barnahusPlaceholder')}
				</Text>
			</>
			<>
				<Inline alignItems="center" gap={4}>
					<Label>{t('Barnahuses.assignedMasterAdmin')}</Label>
					<InputInfo infoText="Barnahuses.assignedMasterAdminInfoText" />
				</Inline>
				<Text fontSize="small" color="neutral.800">
					{t('Barnahuses.assignedMasterAdminPlaceholder')}
				</Text>
			</>
		</DetailsWrapper>
	)
}

export default BarnahusDetailsPage
