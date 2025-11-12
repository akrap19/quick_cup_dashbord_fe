import { useTranslations } from 'next-intl'

import { Box } from 'components/layout/box'

import { BadgeVariants, badge } from './Badge.css'

type Props = BadgeVariants & Record<string, unknown>

const variantTextMap: Record<string, string> = {
	draft: 'General.draft',
	default: 'General.default',
	published: 'General.published',
	hidden: 'General.hidden',
	open: 'General.open',
	inprogress: 'General.inProgress',
	closed: 'General.closed',
	other: 'General.other',
	active: 'General.active',
	blocked: 'General.blocked',
	created: 'General.created',
	deleted: 'General.deleted'
}

export const Badge = ({ variant = 'draft' }: Props) => {
	const t = useTranslations()
	const variantWithLowerCase: any = variant.toLowerCase()
	const text = variantTextMap[variantWithLowerCase] || 'Unknown'

	return <Box className={badge({ variant: variantWithLowerCase })}>{t(text)}</Box>
}
