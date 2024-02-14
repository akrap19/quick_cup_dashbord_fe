'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { atoms } from 'style/atoms.css'

import { drawerItems } from './Data'
import { drawer } from './Drawer.css'
import { DrawerItem } from './DrawerItem'
import { BrandLogo } from '../brand-logo/BrandLogo'

export const Drawer = () => {
	const pathname = usePathname()

	return (
		<Box className={drawer}>
			<Stack gap={13}>
				<Box paddingLeft={6}>
					<BrandLogo addHomeLink />
				</Box>
				<Stack gap={4}>
					{drawerItems.map(item =>
						pathname.includes(item.route) ? (
							<DrawerItem item={item} />
						) : (
							<Link href={item.route} className={atoms({ textDecoration: 'none' })}>
								<DrawerItem item={item} />
							</Link>
						)
					)}
				</Stack>
			</Stack>
		</Box>
	)
}
