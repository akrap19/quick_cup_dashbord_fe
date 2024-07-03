/* eslint-disable no-undef */
import BriefcaseIcon from '@/components/icons/block-icon/assets/briefcase-icon.svg'
import ClipboardListIcon from '@/components/icons/block-icon/assets/clipboard-list-icon.svg'
import DocumentDuplicateIcon from '@/components/icons/block-icon/assets/document-duplicate-icon.svg'
import FileIcon from '@/components/icons/block-icon/assets/file-icon.svg'
import GearIcon from '@/components/icons/block-icon/assets/gear-icon.svg'
import GlobeIcon from '@/components/icons/block-icon/assets/globe-icon.svg'
import GroupsIcon from '@/components/icons/block-icon/assets/groups-icon.svg'
import HouseIcon from '@/components/icons/block-icon/assets/house-icon.svg'
import ManageIcon from '@/components/icons/block-icon/assets/manage-icon.svg'
import PersonIcon from '@/components/icons/block-icon/assets/person-icon.svg'
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
	{ label: 'barnahuses', icon: <HouseIcon />, route: ROUTES.BARNAHUSES, usedByRoles: [UserRoleEnum.SUPER_ADMIN] },
	{ label: 'admins', icon: <PersonIcon />, route: ROUTES.ADMINS, usedByRoles: [UserRoleEnum.MASTER_ADMIN] },
	{ label: 'masterAdmins', icon: <PersonIcon />, route: ROUTES.MASTER_ADMINS, usedByRoles: [UserRoleEnum.SUPER_ADMIN] },
	{
		label: 'practitioners',
		icon: <GroupsIcon />,
		route: ROUTES.PRACTITIONERS,
		usedByRoles: [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN]
	},
	{
		label: 'manageContent',
		icon: <ManageIcon />,
		usedByRoles: [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN],
		subItems: [
			{ label: 'content', icon: <ClipboardListIcon />, route: ROUTES.CONTENT, isSubItem: true },
			{ label: 'languages', icon: <GlobeIcon />, route: ROUTES.LANGUAGES, isSubItem: true }
		]
	},
	{
		label: 'caseFiles',
		icon: <FileIcon />,
		route: ROUTES.CASE_FILES,
		usedByRoles: [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN, UserRoleEnum.PRACTITIONER]
	},
	{
		label: 'caseJourney',
		icon: <BriefcaseIcon />,
		route: ROUTES.CASE_JOURNEY,
		usedByRoles: [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN, UserRoleEnum.PRACTITIONER]
	},
	{
		label: 'templates',
		icon: <DocumentDuplicateIcon />,
		route: ROUTES.TEMPLATES,
		usedByRoles: [UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN, UserRoleEnum.PRACTITIONER]
	},
	{
		label: 'settings',
		icon: <GearIcon />,
		route: ROUTES.SETTINGS,
		usedByRoles: [UserRoleEnum.SUPER_ADMIN, UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN, UserRoleEnum.PRACTITIONER]
	}
]
