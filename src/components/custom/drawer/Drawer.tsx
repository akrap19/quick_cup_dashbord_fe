'use client'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { BrandLogo } from '../brandLogo/BrandLogo'
import { drawer, drawerItem, drawerItemSelected } from './Drawer.css'
import House from '@/components/icons/block-icon/assets/house.svg'
import Person from '@/components/icons/block-icon/assets/person.svg'
import Gear from '@/components/icons/block-icon/assets/gear.svg'
import { Text } from '../../typography/text'
import clsx from 'clsx'
import { ROUTES } from 'parameters'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { atoms } from 'style/atoms.css'

const drawerItems = [
	{ label: 'Barnahuses', icon: <House />, route: ROUTES.BARNAHUSES },
	{ label: 'Admins', icon: <Person />, route: ROUTES.ADMINS },
	{ label: 'Settings', icon: <Gear />, route: ROUTES.SETTINGS }
]

export const Drawer = () => {
	const pathname = usePathname()

	return (
		<Box className={drawer}>
			<Stack gap={13}>
				<Box paddingLeft={6}>
					<BrandLogo addHomeLink={true} />
				</Box>
				<Stack gap={4}>
					{drawerItems.map(item => (
						<Link href={item.route} className={atoms({ textDecoration: 'none' })}>
							<Box className={clsx(drawerItem, pathname === item.route && drawerItemSelected)}>
								<Inline gap="4" alignItems="center">
									{item.icon}
									<Text fontSize="big" fontWeight="semibold">
										{item.label}
									</Text>
								</Inline>
							</Box>
						</Link>
					))}
				</Stack>
			</Stack>
		</Box>
	)
}
