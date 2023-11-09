'use client'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { BrandLogo } from '../brand-logo/BrandLogo'
import { drawer, drawerItem, drawerItemSelected } from './Drawer.css'
import HouseIcon from '@/components/icons/block-icon/assets/house-icon.svg'
import PersonIcon from '@/components/icons/block-icon/assets/person-icon.svg'
import GearIcon from '@/components/icons/block-icon/assets/gear-icon.svg'
import { Text } from '../../typography/text'
import clsx from 'clsx'
import { ROUTES } from 'parameters'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { atoms } from 'style/atoms.css'

const drawerItems = [
	{ label: 'Barnahuses', icon: <HouseIcon />, route: ROUTES.BARNAHUSES },
	{ label: 'Admins', icon: <PersonIcon />, route: ROUTES.ADMINS },
	{ label: 'Settings', icon: <GearIcon />, route: ROUTES.SETTINGS }
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
