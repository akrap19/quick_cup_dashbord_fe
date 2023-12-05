'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'

const AdminsDetailsPage = () => {
	const t = useTranslations()
	useNavbarItems({
		title: 'Admin name',
		backLabel: 'Admins.back',
		actionButton: <EditButton buttonLabel="Admins.edit" buttonLink="/" />
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('General.email')}</Label>
				<Text fontSize="small" color="neutral.800">
					lisa.andreson@gmail.com
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.barnahusLocation')}</Label>
				<Text fontSize="small" color="neutral.800">
					{t('General.barnahusPlaceholder')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.firstName')}</Label>
				<Text fontSize="small" color="neutral.800">
					Lisa
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.lastName')}</Label>
				<Text fontSize="small" color="neutral.800">
					Anderson
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.phoneNumber')}</Label>
				<Text fontSize="small" color="neutral.800">
					+385 97 172 84 92
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}

export default AdminsDetailsPage
