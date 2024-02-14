'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'

import { Item } from './Data'
import { drawerItem, drawerItemSelected } from './Drawer.css'
import { Text } from '../../typography/text'

interface Props {
	item: Item
}

export const DrawerItem = ({ item }: Props) => {
	const pathname = usePathname()
	const t = useTranslations()

	return (
		<Box className={clsx(drawerItem, pathname.includes(item.route) && drawerItemSelected)}>
			<Inline gap={4} alignItems="center">
				{item.icon}
				<Text fontSize="big" fontWeight="semibold">
					{t(`General.${item.label}`)}
				</Text>
			</Inline>
		</Box>
	)
}
