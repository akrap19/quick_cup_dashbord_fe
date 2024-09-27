'use client'

import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'

import { Loader } from '@/components/custom/loader/Loader'
import { Box } from '@/components/layout/box'
import { Tabs } from '@/components/navigation/tabs/Tabs'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useNavbarItemsStore } from '@/store/navbar'
import { Settings } from 'api/models/settings/settings'

import { EmailForm } from './emailForm'
import { PasswordForm } from './passwordForm'
import { PersonalInfoForm } from './personalInfoForm'

interface Props {
	settings: Settings
	session: Session | null
}

const SettingsTabs = ({ settings, session }: Props) => {
	const t = useTranslations()
	const { navbarIsLoading } = useNavbarItemsStore()
	useNavbarItems({ title: 'General.settings' })

	return (
		<Box>
			{navbarIsLoading ? (
				<Loader />
			) : (
				<Tabs size="large">
					<Tabs.Tab value="personalInfo" defaultTab>
						{t('General.personalInfo')}
					</Tabs.Tab>
					<Tabs.Tab value="password">{t('Authorization.password')}</Tabs.Tab>
					<Tabs.Tab value="email">{t('General.email')}</Tabs.Tab>
					<Tabs.Panel value="personalInfo">
						<PersonalInfoForm settings={settings} session={session} />
					</Tabs.Panel>
					<Tabs.Panel value="password">
						<PasswordForm />
					</Tabs.Panel>
					<Tabs.Panel value="email">
						<EmailForm settings={settings} />
					</Tabs.Panel>
				</Tabs>
			)}
		</Box>
	)
}

export default SettingsTabs
