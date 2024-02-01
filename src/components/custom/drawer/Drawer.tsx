'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import FileIcon from '@/components/icons/block-icon/assets/file-icon.svg'
import GearIcon from '@/components/icons/block-icon/assets/gear-icon.svg'
import GroupsIcon from '@/components/icons/block-icon/assets/groups-icon.svg'
import HouseIcon from '@/components/icons/block-icon/assets/house-icon.svg'
import PersonIcon from '@/components/icons/block-icon/assets/person-icon.svg'
import TemplateIcon from '@/components/icons/block-icon/assets/template-icon.svg'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { ROUTES } from 'parameters'
import { atoms } from 'style/atoms.css'

import { drawer, drawerItem, drawerItemSelected } from './Drawer.css'
import { Text } from '../../typography/text'
import { BrandLogo } from '../brand-logo/BrandLogo'

const drawerItems = [
	{ label: 'barnahuses', icon: <HouseIcon />, route: ROUTES.BARNAHUSES },
	{ label: 'admins', icon: <PersonIcon />, route: ROUTES.ADMINS },
	{ label: 'masterAdmins', icon: <PersonIcon />, route: ROUTES.MASTER_ADMINS },
	{ label: 'practitioners', icon: <GroupsIcon />, route: ROUTES.PRACTITIONERS },
	{ label: 'manageContent', icon: <TemplateIcon />, route: ROUTES.MANAGE_CONTENT },
	{ label: 'caseFiles', icon: <FileIcon />, route: ROUTES.CASE_FILES },
	{ label: 'caseJourney', icon: <TemplateIcon />, route: ROUTES.CASE_JOURNEY },
	{ label: 'settings', icon: <GearIcon />, route: ROUTES.SETTINGS }
]

export const Drawer = () => {
	const pathname = usePathname()
	const t = useTranslations()

	return (
		<Box className={drawer}>
			<Stack gap={13}>
				<Box paddingLeft={6}>
					<BrandLogo addHomeLink />
				</Box>
				<Stack gap={4}>
					{drawerItems.map(item => (
						<Link href={item.route} className={atoms({ textDecoration: 'none' })}>
							<Box className={clsx(drawerItem, pathname.includes(item.route) && drawerItemSelected)}>
								<Inline gap={4} alignItems="center">
									{item.icon}
									<Text fontSize="big" fontWeight="semibold">
										{t(`General.${item.label}`)}
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
