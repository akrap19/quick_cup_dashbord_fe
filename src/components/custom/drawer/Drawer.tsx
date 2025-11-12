'use client'

import { useState } from 'react'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'

import { Item, ItemSection, drawerItems } from './Data'
import { drawer, drawerSection } from './Drawer.css'
import { DrawerItem } from './DrawerItem'
import { BrandLogo } from '../brand-logo/BrandLogo'
import { Text } from '@/components/typography/text'
import { useTranslations } from 'next-intl'

interface Props {
	role: string
}

const SECTIONLESS_KEY = 'no-section' as const

type GroupKey = ItemSection | typeof SECTIONLESS_KEY

export const Drawer = ({ role }: Props) => {
	const t = useTranslations()
	const [isOpen, setIsOpen] = useState(false)
	const filteredDrawerItems: Item[] = drawerItems.filter((item: Item) => item.usedByRoles?.includes(role))

	const groupedItems = filteredDrawerItems.reduce<Partial<Record<GroupKey, Item[]>>>((acc, item) => {
		const key: GroupKey = (item.section ?? SECTIONLESS_KEY) as GroupKey
		if (!acc[key]) {
			acc[key] = []
		}
		acc[key]!.push(item)
		return acc
	}, {})

	const renderItems = (items: Item[]) => {
		const elements: JSX.Element[] = []

		items.forEach(item => {
			elements.push(<DrawerItem key={item.label} item={item} isOpen={isOpen} setIsOpen={setIsOpen} />)

			if (item?.subItems && isOpen) {
				item.subItems.forEach(subItem => {
					elements.push(
						<DrawerItem key={`${item.label}-${subItem.label}`} item={subItem} isOpen={isOpen} setIsOpen={setIsOpen} />
					)
				})
			}
		})

		return elements
	}

	return (
		<Box className={drawer}>
			<Stack gap={13} alignItems="center">
				<Box>
					<BrandLogo addHomeLink height={70} />
				</Box>
				<Stack gap={6} style={{ width: '100%' }}>
					{[...(Object.keys(groupedItems) as GroupKey[])].map(sectionKey => {
						const items = groupedItems[sectionKey]!

						if (!items || items.length === 0) {
							return null
						}

						if (sectionKey === SECTIONLESS_KEY) {
							return (
								<Stack key={sectionKey} gap={2}>
									{renderItems(items)}
								</Stack>
							)
						}

						return (
							<Box key={sectionKey} className={drawerSection}>
								<Stack gap={2}>
									<Box paddingLeft={2}>
										<Text fontWeight="semibold" color="neutral.400">
											{t(`General.${sectionKey}`)}
										</Text>
									</Box>
									<Stack>{renderItems(items)}</Stack>
								</Stack>
							</Box>
						)
					})}
				</Stack>
			</Stack>
		</Box>
	)
}
