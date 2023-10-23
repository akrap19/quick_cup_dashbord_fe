'use client'

import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import { getChildrenByType } from 'react-nanny'

import * as styles from './Tabs.css'
import { TabsProvider, useTabsProvider } from './TabsProvider'

interface Props {
	children: ReactNode
}

interface Tab {
	value: string
	children: ReactNode
}

interface Panel {
	value: string
	children: ReactNode
}

interface TabsComposition {
	Tab: FC<Tab>
	Panel: FC<Panel>
}

export const Tabs: FC<Props> & TabsComposition = ({ children }: Props) => {
	const tabs = getChildrenByType(children, [Tabs.Tab])
	const panel = getChildrenByType(children, [Tabs.Panel])

	return (
		<TabsProvider>
			<div className={styles.tabsWrapper}>{tabs}</div>
			<div>{panel}</div>
		</TabsProvider>
	)
}

Tabs.Tab = ({ value, children }: Tab) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { activeTab, onActiveTabChange } = useTabsProvider()

	return (
		<button
			type="button"
			onClick={() => onActiveTabChange(value)}
			className={clsx(styles.tab, activeTab === value && styles.activeTab)}>
			{children}
		</button>
	)
}

Tabs.Panel = ({ value, children }: Panel) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { activeTab } = useTabsProvider()
	return activeTab === value ? <div>{children}</div> : null
}
