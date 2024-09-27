'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { AddButton } from '@/components/custom/button/add-button'
import { Loader } from '@/components/custom/loader/Loader'
import { Box } from '@/components/layout/box'
import { Tabs } from '@/components/navigation/tabs/Tabs'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useNavbarItemsStore } from '@/store/navbar'
import { Base } from 'api/models/common/base'
import { Language } from 'api/models/language/language'
import { ROUTES } from 'parameters'

import { ManageContentColumn } from './columns'
import { Content } from './Content'

// eslint-disable-next-line
interface Props<TData, TValue> {
	aboutData: ManageContentColumn[]
	roomsData: ManageContentColumn[]
	staffData: ManageContentColumn[]
	languages: Language[]
}

export const ContentTabs = <TData, TValue>({ aboutData, roomsData, staffData, languages }: Props<TData, TValue>) => {
	const t = useTranslations()
	const { navbarIsLoading } = useNavbarItemsStore()
	const languageBase: Base = { id: languages[0]?.languageId, name: languages[0]?.name }
	const [languageValue, setLanguageValue] = useState(languageBase)
	useNavbarItems({ title: 'General.content', useUserDropdown: true })

	return (
		<Box width="100%">
			{navbarIsLoading ? (
				<Loader />
			) : (
				<Tabs>
					{(aboutData?.length > 0 || roomsData?.length > 0 || staffData?.length > 0) && (
						<AddButton buttonLabel={t('ManageContent.add')} buttonLink={ROUTES.ADD_CONTENT} />
					)}
					<Tabs.Tab value="aboutBarnahus" defaultTab>
						{t('General.aboutBarnahus')}
					</Tabs.Tab>
					<Tabs.Tab value="rooms">
						<Box>{t('General.rooms')}</Box>
					</Tabs.Tab>
					<Tabs.Tab value="staff">{t('General.staff')}</Tabs.Tab>
					<Tabs.Panel value="aboutBarnahus">
						<Content
							contentSection="aboutBarnahus"
							contentTableData={aboutData}
							languages={languages}
							languageValue={languageValue}
							setLanguageValue={setLanguageValue}
						/>
					</Tabs.Panel>
					<Tabs.Panel value="rooms">
						<Content
							contentSection="rooms"
							contentTableData={roomsData}
							languages={languages}
							languageValue={languageValue}
							setLanguageValue={setLanguageValue}
						/>
					</Tabs.Panel>
					<Tabs.Panel value="staff">
						<Content
							contentSection="staff"
							contentTableData={staffData}
							languages={languages}
							languageValue={languageValue}
							setLanguageValue={setLanguageValue}
						/>
					</Tabs.Panel>
				</Tabs>
			)}
		</Box>
	)
}
