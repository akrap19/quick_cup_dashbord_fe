'use client'

import clsx from 'clsx'
import { FC, ReactNode, useEffect } from 'react'
import { getChildrenByType } from 'react-nanny'

import { AddButton } from '@/components/custom/button/add-button'
import { Button } from '@/components/inputs/button'
import { Inline } from '@/components/layout/inline'

import * as styles from './Tabs.css'
import { TabsProvider, useTabsProvider } from './TabsProvider'

type TabsProps = {
	children: ReactNode
}

type Props = TabsProps & styles.TabsWrapperVariants

interface Tab {
	value: string
	defaultTab?: boolean
	currentlyActiveTab?: boolean
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

export const Tabs: FC<Props> & TabsComposition = ({ children, size, variant = 'button' }: Props) => {
	const tabs = getChildrenByType(children, [Tabs.Tab])
	const button = getChildrenByType(children, [AddButton, Button])
	const panel = getChildrenByType(children, [Tabs.Panel])

	return (
		<TabsProvider>
			<Inline justifyContent="space-between" alignItems="flex-end">
				<div
					style={{
						display: 'flex',
						overflowX: 'auto',
						whiteSpace: 'nowrap',
						scrollbarWidth: 'thin'
					}}>
					<div className={styles.tabsWrapper({ size: size || (button ? 'small' : 'large'), variant })}>{tabs}</div>
				</div>
			</Inline>
			<div>{panel}</div>
		</TabsProvider>
	)
}

Tabs.Tab = ({ value, children, defaultTab, currentlyActiveTab }: Tab) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { activeTab, onActiveTabChange } = useTabsProvider()

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (defaultTab) {
			onActiveTabChange(value)
		}
	}, [])

	return currentlyActiveTab !== undefined ? (
		<span className={clsx(styles.tab({ variant: 'span' }), currentlyActiveTab && styles.activeTab)}>{children}</span>
	) : (
		<button
			type="button"
			onClick={() => onActiveTabChange(value)}
			className={clsx(styles.tab({ variant: 'button' }), activeTab === value && styles.activeTab)}>
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
