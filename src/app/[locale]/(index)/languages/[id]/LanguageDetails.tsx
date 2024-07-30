'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Language } from 'api/models/language/language'
import { ROUTES } from 'parameters'

interface Props {
	language: Language
}

const LanguageDetails = ({ language }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: language.name ?? 'General.titleNotDefined',
		backLabel: 'Languages.back',
		actionButton: <EditButton buttonLabel="Languages.edit" buttonLink={ROUTES.EDIT_LANGUAGES + language.languageId} />
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
				<Label>{t('General.status')}</Label>
				<Text fontSize="small" color="neutral.800">
					{language.status}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Languages.autoTranslate')}</Label>
				<Text fontSize="small" color="neutral.800" textTransform="capitalize">
					{language.autoTranslate.toString()}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}

export default LanguageDetails
