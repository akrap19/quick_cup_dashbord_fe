'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { handleFullName } from '@/utils/handleFullName'
import { Admin } from 'api/models/admin/admin'
import { ROUTES } from 'parameters'

interface Props {
	masterAdmin: Admin
}

export const MasterAdminDetails = ({ masterAdmin }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: handleFullName(masterAdmin.firstName, masterAdmin.lastName),
		backLabel: 'MasterAdmins.back',
		actionButton: (
			<EditButton buttonLabel="MasterAdmins.edit" buttonLink={ROUTES.EDIT_MASTER_ADMINS + masterAdmin.userId} />
		)
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('General.firstName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{masterAdmin.firstName}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.barnahus')}</Label>
				<Text fontSize="small" color="neutral.800">
					{masterAdmin.locations.length > 0
						? masterAdmin.locations.join(', ')
						: t('General.barnahus') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.lastName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{masterAdmin.lastName}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.email')}</Label>
				<Text fontSize="small" color="neutral.800">
					{masterAdmin.email}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.phoneNumber')}</Label>
				<Text fontSize="small" color="neutral.800">
					{masterAdmin.phoneNumber ?? t('General.phoneNumber') + t('General.notDefined')}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}
