/* eslint-disable no-undef */
import GearIcon from '@/components/icons/block-icon/assets/gear-icon.svg'
import GroupsIcon from '@/components/icons/block-icon/assets/groups-icon.svg'
import PersonIcon from '@/components/icons/block-icon/assets/person-icon.svg'
import { ServiceIcon } from '@/components/icons/service-icon'
import { UserRoleEnum } from 'enums/userRoleEnum'
import { ROUTES } from 'parameters'

export interface Item {
	label: string
	icon: JSX.Element
	route?: string
	isSubItem?: boolean
	usedByRoles?: string[]
	subItems?: Item[]
}

export const drawerItems: Item[] = [
	{ label: 'admins', icon: <PersonIcon />, route: ROUTES.ADMINS, usedByRoles: [UserRoleEnum.MASTER_ADMIN] },
	{
		label: 'service',
		icon: <ServiceIcon />,
		route: ROUTES.SERVICES,
		usedByRoles: [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN]
	},
	{
		label: 'clients',
		icon: <GroupsIcon />,
		route: ROUTES.CLIENTS,
		usedByRoles: [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN]
	},
	{
		label: 'settings',
		icon: <GearIcon />,
		route: ROUTES.SETTINGS,
		usedByRoles: [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN, UserRoleEnum.CLIENT, UserRoleEnum.SERVICE]
	}
]
