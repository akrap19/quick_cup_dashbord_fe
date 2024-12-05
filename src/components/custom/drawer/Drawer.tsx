'use client'

import { useState } from 'react'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'

import { Item, drawerItems } from './Data'
import { drawer } from './Drawer.css'
import { DrawerItem } from './DrawerItem'
import { BrandLogo } from '../brand-logo/BrandLogo'

interface Props {
	role: string
}

export const Drawer = ({ role }: Props) => {
	const [isOpen, setIsOpen] = useState(false)
	const filtredDrawerItems: Item[] = drawerItems.filter((item: Item) => item.usedByRoles?.includes(role))

	return (
		<Box className={drawer}>
			<Stack gap={13}>
				<Box paddingLeft={6}>
					<BrandLogo addHomeLink />
				</Box>
				<Stack gap={4}>
					{filtredDrawerItems.map(item => (
						<>
							<DrawerItem item={item} isOpen={isOpen} setIsOpen={setIsOpen} />
							{item?.subItems &&
								isOpen &&
								item?.subItems.map((subItem: Item) => (
									<DrawerItem item={subItem} isOpen={isOpen} setIsOpen={setIsOpen} />
								))}
						</>
					))}
				</Stack>
			</Stack>
		</Box>
	)
}
