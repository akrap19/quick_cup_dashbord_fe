'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { handleFullName } from '@/utils/handleFullName'
import { Practitioner } from 'api/models/practitioners/practitioner'
import { ROUTES } from 'parameters'

interface Props {
	practitioner: Practitioner
}

export const PractitionerDetails = ({ practitioner }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: handleFullName(practitioner.firstName, practitioner.lastName),
		backLabel: 'Practitioners.back',
		actionButton: (
			<EditButton buttonLabel="Practitioners.edit" buttonLink={ROUTES.EDIT_PRACTITIONERS + practitioner.id} />
		)
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('General.email')}</Label>
				<Text fontSize="small" color="neutral.800">
					{practitioner.email}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.barnahusLocation')}</Label>
				<Text fontSize="small" color="neutral.800">
					{practitioner.location}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.firstName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{practitioner.firstName}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.lastName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{practitioner.lastName}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.role')}</Label>
				<Text fontSize="small" color="neutral.800">
					{practitioner.role}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.phoneNumber')}</Label>
				<Text fontSize="small" color="neutral.800">
					{practitioner.phoneNumber ?? t('General.phoneNumber') + t('General.notDefined')}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}
