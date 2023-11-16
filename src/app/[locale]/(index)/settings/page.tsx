'use client'
import { Box } from '@/components/layout/box'
import { Tabs } from '@/components/navigation/tabs/Tabs'
import { useTranslations } from 'next-intl'
import { PasswordForm } from './passwordForm'
import { PersonalInfoForm } from './personalInfoForm'

const SettingsPage = () => {
	const t = useTranslations()

	return (
		<Box paddingTop={8} paddingX={10} width="100%">
			<Box style={{ maxWidth: '60rem' }}>
				<Tabs>
					<Tabs.Tab value="personalInfo">{t('General.personalInfo')}</Tabs.Tab>
					<Tabs.Tab value="password">{t('Authorization.password')}</Tabs.Tab>
					<Tabs.Panel value="personalInfo">
						<PersonalInfoForm />
					</Tabs.Panel>
					<Tabs.Panel value="password">
						<PasswordForm />
					</Tabs.Panel>
				</Tabs>
			</Box>
		</Box>
	)
}

export default SettingsPage
