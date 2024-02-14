/* eslint-disable no-undef */
import FileIcon from '@/components/icons/block-icon/assets/file-icon.svg'
import GearIcon from '@/components/icons/block-icon/assets/gear-icon.svg'
import GroupsIcon from '@/components/icons/block-icon/assets/groups-icon.svg'
import HouseIcon from '@/components/icons/block-icon/assets/house-icon.svg'
import PersonIcon from '@/components/icons/block-icon/assets/person-icon.svg'
import TemplateIcon from '@/components/icons/block-icon/assets/template-icon.svg'
import { ROUTES } from 'parameters'

export interface Item {
	label: string
	icon: JSX.Element
	route: string
}

export const drawerItems: Item[] = [
	{ label: 'barnahuses', icon: <HouseIcon />, route: ROUTES.BARNAHUSES },
	{ label: 'admins', icon: <PersonIcon />, route: ROUTES.ADMINS },
	{ label: 'masterAdmins', icon: <PersonIcon />, route: ROUTES.MASTER_ADMINS },
	{ label: 'practitioners', icon: <GroupsIcon />, route: ROUTES.PRACTITIONERS },
	{ label: 'manageContent', icon: <TemplateIcon />, route: ROUTES.MANAGE_CONTENT },
	{ label: 'caseFiles', icon: <FileIcon />, route: ROUTES.CASE_FILES },
	{ label: 'caseJourney', icon: <TemplateIcon />, route: ROUTES.CASE_JOURNEY },
	{ label: 'settings', icon: <GearIcon />, route: ROUTES.SETTINGS }
]
