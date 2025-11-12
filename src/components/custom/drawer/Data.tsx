/* eslint-disable no-undef */
import GearIcon from '@/components/icons/block-icon/assets/gear-icon.svg'
import GroupsIcon from '@/components/icons/block-icon/assets/groups-icon.svg'
import PersonIcon from '@/components/icons/block-icon/assets/person-icon.svg'
import { HomeIcon } from '@/components/icons/home-icon'
import { ServiceIcon } from '@/components/icons/service-icon'
import { ShoppingBagIcon } from '@/components/icons/shopping-bag-icon'
import { CalendarStarIcon } from '@/components/icons/calendar-star-icon'
import { ListBulletsIcon } from '@/components/icons/list-bullets-icon'
import { UserRoleEnum } from 'enums/userRoleEnum'
import { ROUTES } from 'parameters'
import { KeyIcon } from '@/components/icons/key-icon'
import { BarcodeIcon } from '@/components/icons/barcode-icon'

export type ItemSection = 'users' | 'offers' | 'manage'

export interface Item {
	label: string
	icon: JSX.Element
	route?: string
	isSubItem?: boolean
	usedByRoles?: string[]
	subItems?: Item[]
	section?: ItemSection
}

export const drawerItems: Item[] = [
	{
		label: 'home',
		icon: <HomeIcon />,
		route: ROUTES.HOME,
		usedByRoles: [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN, UserRoleEnum.CLIENT, UserRoleEnum.SERVICE]
	},
	{
		label: 'admins',
		icon: <PersonIcon />,
		route: ROUTES.ADMINS,
		usedByRoles: [UserRoleEnum.MASTER_ADMIN],
		section: 'users'
	},
	{
		label: 'clients',
		icon: <GroupsIcon />,
		route: ROUTES.CLIENTS,
		usedByRoles: [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN, UserRoleEnum.SERVICE],
		section: 'users'
	},
	{
		label: 'products',
		icon: <BarcodeIcon />,
		usedByRoles: [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN, UserRoleEnum.CLIENT, UserRoleEnum.SERVICE],
		section: 'offers',
		subItems: [
			{ label: 'buy', icon: <ShoppingBagIcon />, route: ROUTES.BUY, isSubItem: true },
			{ label: 'rent', icon: <KeyIcon />, route: ROUTES.RENT, isSubItem: true }
		]
	},
	{
		label: 'service',
		icon: <ServiceIcon />,
		route: ROUTES.SERVICES,
		usedByRoles: [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN, UserRoleEnum.CLIENT, UserRoleEnum.SERVICE],
		section: 'offers'
	},
	{
		label: 'events',
		icon: <CalendarStarIcon />,
		route: ROUTES.EVENTS,
		usedByRoles: [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN, UserRoleEnum.CLIENT, UserRoleEnum.SERVICE],
		section: 'manage'
	},
	{
		label: 'orders',
		icon: <ListBulletsIcon />,
		route: ROUTES.ORDERS,
		usedByRoles: [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN, UserRoleEnum.CLIENT, UserRoleEnum.SERVICE],
		section: 'manage'
	},
	{
		label: 'settings',
		icon: <GearIcon />,
		route: ROUTES.SETTINGS,
		usedByRoles: [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN, UserRoleEnum.CLIENT, UserRoleEnum.SERVICE],
		section: 'manage'
	}
]
