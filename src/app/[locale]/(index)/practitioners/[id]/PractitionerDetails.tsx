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
			<EditButton buttonLabel="Practitioners.edit" buttonLink={ROUTES.EDIT_PRACTITIONERS + practitioner.userId} />
		)
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('General.barnahusId')}</Label>
				<Text fontSize="small" color="neutral.800">
					{practitioner.locationCode ?? t('General.barnahusId') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.barnahusLocation')}</Label>
				<Text fontSize="small" color="neutral.800">
					{practitioner.location ?? t('General.barnahusLocation') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.firstName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{practitioner.firstName ?? t('General.firstName') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.lastName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{practitioner.lastName ?? t('General.lastName') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.email')}</Label>
				<Text fontSize="small" color="neutral.800">
					{practitioner.email ?? t('General.email') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.phoneNumber')}</Label>
				<Text fontSize="small" color="neutral.800">
					{practitioner.phoneNumber ?? t('General.phoneNumber') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.role')}</Label>
				<Text fontSize="small" color="neutral.800" textTransform="capitalize">
					{practitioner.userProfession ?? t('General.role') + t('General.notDefined')}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}
