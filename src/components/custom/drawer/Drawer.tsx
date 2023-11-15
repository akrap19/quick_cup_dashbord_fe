'use client'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { BrandLogo } from '../brand-logo/BrandLogo'
import { drawer, drawerItem, drawerItemSelected } from './Drawer.css'
import HouseIcon from '@/components/icons/block-icon/assets/house-icon.svg'
import PersonIcon from '@/components/icons/block-icon/assets/person-icon.svg'
import GearIcon from '@/components/icons/block-icon/assets/gear-icon.svg'
import GroupIcon from '@/components/icons/block-icon/assets/group-icon.svg'
import TemplateIcon from '@/components/icons/block-icon/assets/template-icon.svg'
import { Text } from '../../typography/text'
import clsx from 'clsx'
import { ROUTES } from 'parameters'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { atoms } from 'style/atoms.css'

const drawerItems = [
	{ label: 'barnahuses', icon: <HouseIcon />, route: ROUTES.BARNAHUSES },
	{ label: 'admins', icon: <PersonIcon />, route: ROUTES.ADMINS },
	{ label: 'practitioners', icon: <GroupIcon />, route: ROUTES.PRACTITIONERS },
	{ label: 'manageContent', icon: <TemplateIcon />, route: ROUTES.MANAGE_CONTENT },
	{ label: 'caseFiles', icon: <TemplateIcon />, route: ROUTES.CASE_FILES },
	{ label: 'settings', icon: <GearIcon />, route: ROUTES.SETTINGS }
]

export const Drawer = () => {
	const pathname = usePathname()
	const t = useTranslations()

	return (
		<Box className={drawer}>
			<Stack gap={13}>
				<Box paddingLeft={6}>
					<BrandLogo addHomeLink={true} />
				</Box>
				<Stack gap={4}>
					{drawerItems.map(item => (
						<Link href={item.route} className={atoms({ textDecoration: 'none' })}>
							<Box className={clsx(drawerItem, pathname.includes(item.route) && drawerItemSelected)}>
								<Inline gap="4" alignItems="center">
									{item.icon}
									<Text fontSize="big" fontWeight="semibold">
										{t('General.' + item.label)}
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
