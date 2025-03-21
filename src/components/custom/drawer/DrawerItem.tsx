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
import { Dispatch, SetStateAction } from 'react'

interface Props {
	item: Item
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const DrawerItem = ({ item, isOpen, setIsOpen }: Props) => {
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

	return item?.route ? (
		<Button variant="adaptive" size="auto" href={item.route}>
			<Box
				className={clsx(item.isSubItem ? drawerSubItem : drawerItem, handleRoute(item) && drawerItemSelected)}
				style={{ cursor: item.route && pathname.includes(item.route) ? 'default' : 'inherit' }}>
				<Inline gap={4} alignItems="center">
					{item.icon}
					<Box
						style={{
							maxWidth: '200px',
							textOverflow: 'ellipsis',
							whiteSpace: 'Wrap',
							flexGrow: '1',
							textAlign: 'center'
						}}>
						<Text fontSize="big" fontWeight="semibold" lineHeight="xlarge" textAlign="left">
							{t(`General.${item.label}`)}
						</Text>
					</Box>
					{item?.subItems && (isOpen ? <CarretDownIcon /> : <CarretUpIcon />)}
				</Inline>
			</Box>
		</Button>
	) : (
		<Button variant="adaptive" size="auto" onClick={() => setIsOpen(!isOpen)}>
			<Box
				className={clsx(item.isSubItem ? drawerSubItem : drawerItem, handleRoute(item) && drawerItemSelected)}
				style={{ cursor: item.route && pathname.includes(item.route) ? 'default' : 'inherit' }}>
				<Inline gap={4} alignItems="center">
					{item.icon}
					<Box
						style={{
							maxWidth: '200px',
							textOverflow: 'ellipsis',
							whiteSpace: 'Wrap',
							flexGrow: '1',
							textAlign: 'center'
						}}>
						<Text fontSize="big" fontWeight="semibold" lineHeight="xlarge" textAlign="left">
							{t(`General.${item.label}`)}
						</Text>
					</Box>
					{item?.subItems && (isOpen ? <CarretDownIcon /> : <CarretUpIcon />)}
				</Inline>
			</Box>
		</Button>
	)
}
