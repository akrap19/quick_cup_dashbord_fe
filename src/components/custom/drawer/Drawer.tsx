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
			<Stack gap={13} alignItems="center">
				<Box>
					<BrandLogo addHomeLink height={70} />
				</Box>
				<Stack gap={4} style={{ width: '100%' }}>
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
