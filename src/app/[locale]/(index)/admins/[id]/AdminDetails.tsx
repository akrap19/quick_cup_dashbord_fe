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
	admin: Admin
}

export const AdminDetails = ({ admin }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: handleFullName(admin.firstName, admin.lastName),
		backLabel: 'Admins.back',
		actionButton: <EditButton buttonLabel="Admins.edit" buttonLink={ROUTES.EDIT_MASTER_ADMINS + admin.id} />
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('General.firstName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{admin.firstName}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.lastName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{admin.lastName}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.email')}</Label>
				<Text fontSize="small" color="neutral.800">
					{admin.email}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.phoneNumber')}</Label>
				<Text fontSize="small" color="neutral.800">
					{admin.phoneNumber ?? t('General.phoneNumber') + t('General.notDefined')}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}
