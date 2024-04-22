'use client'

import clsx from 'clsx'
import { FC, ReactNode, useEffect } from 'react'
import { getChildrenByType } from 'react-nanny'

import { AddButton } from '@/components/custom/button/add-button'
import { Button } from '@/components/inputs/button'
import { Inline } from '@/components/layout/inline'

import * as styles from './Tabs.css'
import { TabsProvider, useTabsProvider } from './TabsProvider'

interface Props {
	children: ReactNode
}

interface Tab {
	value: string
	defaultTab?: boolean
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
	const button = getChildrenByType(children, [AddButton, Button])
	const panel = getChildrenByType(children, [Tabs.Panel])

	console.log('button', button)
	return (
		<TabsProvider>
			<Inline justifyContent="space-between" alignItems="flex-end">
				<div className={styles.tabsWrapper({ size: button ? 'small' : 'large' })}>{tabs}</div>
				<div>{button}</div>
			</Inline>
			<div>{panel}</div>
		</TabsProvider>
	)
}

Tabs.Tab = ({ value, children, defaultTab }: Tab) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { activeTab, onActiveTabChange } = useTabsProvider()

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (defaultTab) {
			onActiveTabChange(value)
		}
	}, [])

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

Tabs.Panel = ({ value, children }: Panel) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { activeTab } = useTabsProvider()
	return activeTab === value ? <div>{children}</div> : null
}
