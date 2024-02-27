'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { InputInfo } from '@/components/inputs/input-info'
import { Label } from '@/components/inputs/label'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Language } from 'api/models/language/language'

interface Props {
	language: Language
}

const LanguageDetails = ({ language }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: 'Barnahus name',
		backLabel: 'Barnahuses.back',
		actionButton: <EditButton buttonLabel="Barnahuses.edit" buttonLink="/" />
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('Barnahuses.barnahusName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{language.name}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.barnahusLocation')}</Label>
				<Text fontSize="small" color="neutral.800">
					{t('General.barnahusPlaceholder')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Inline gap={4}>
					<Label>{t('Barnahuses.assignedMasterAdmin')}</Label>
					<InputInfo infoText="Barnahuses.assignedMasterAdminInfoText" />
				</Inline>
				<Text fontSize="small" color="neutral.800">
					{t('Barnahuses.assignedMasterAdminPlaceholder')}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}

export default LanguageDetails
