'use client'

import { useTranslations } from 'next-intl'

import { AddButton } from '@/components/custom/button/add-button'
import { Tabs } from '@/components/navigation/tabs/Tabs'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { ROUTES } from 'parameters'

import { Content } from './Content'

// eslint-disable-next-line
interface Props<TData, TValue> {
	aboutData: TData[]
	roomsData: TData[]
	staffData: TData[]
}

export const ContentTabs = <TData, TValue>({ aboutData, roomsData, staffData }: Props<TData, TValue>) => {
	// const ContentTabs = ({ content }: Props) => {
	const t = useTranslations()
	useNavbarItems({ title: 'General.content', useUserDropdown: true })

	return (
		<Tabs>
			<AddButton buttonLabel={t('ManageContent.add')} buttonLink={ROUTES.ADD_CONTENT} />
			<Tabs.Tab value="aboutBarnahus" defaultTab>
				{t('General.aboutBarnahus')}
			</Tabs.Tab>
			<Tabs.Tab value="rooms">{t('General.rooms')}</Tabs.Tab>
			<Tabs.Tab value="staff">{t('General.staff')}</Tabs.Tab>
			<Tabs.Panel value="aboutBarnahus">
				<Content contentSection="aboutBarnahus" contentTableData={aboutData} />
			</Tabs.Panel>
			<Tabs.Panel value="rooms">
				<Content contentSection="rooms" contentTableData={roomsData} />
			</Tabs.Panel>
			<Tabs.Panel value="staff">
				<Content contentSection="staff" contentTableData={staffData} />
			</Tabs.Panel>
		</Tabs>
	)
}
