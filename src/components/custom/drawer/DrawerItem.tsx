'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { CarretDownIcon } from '@/components/icons/carret-down-icon'
import { CarretUpIcon } from '@/components/icons/carret-up-icon'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'

import { Item } from './Data'
import { drawerItem, drawerItemSelected, drawerSubItem } from './Drawer.css'
import { Text } from '../../typography/text'

interface Props {
	item: Item
	isOpen: boolean
	handleOpen: (route?: string) => void
}

export const DrawerItem = ({ item, isOpen, handleOpen }: Props) => {
	const pathname = usePathname()
	const t = useTranslations()

	const handleRoute = (item: Item) => {
		if (!item.subItems) {
			return item.route ? pathname.includes(item.route) : false
		}

		return item.subItems.some(subItem => {
			return subItem.route && pathname.includes(subItem.route) && !isOpen
		})
	}

	return (
		<Button variant="adaptive" size="auto" onClick={() => handleOpen(item.route)}>
			<Box
				className={clsx(item.isSubItem ? drawerSubItem : drawerItem, handleRoute(item) && drawerItemSelected)}
				style={{ cursor: item.route && pathname.includes(item.route) ? 'default' : 'inherit' }}>
				<Inline gap={4} alignItems="center">
					{item.icon}
					<Text fontSize="big" fontWeight="semibold" lineHeight="xlarge">
						{t(`General.${item.label}`)}
					</Text>
					{item?.subItems && (isOpen ? <CarretDownIcon /> : <CarretUpIcon />)}
				</Inline>
			</Box>
		</Button>
	)
}
