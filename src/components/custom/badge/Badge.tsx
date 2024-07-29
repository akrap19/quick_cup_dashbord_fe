import { Box } from 'components/layout/box'
import { useTranslations } from 'next-intl'

import { BadgeVariants, badge } from './Badge.css'

type Props = BadgeVariants & Record<string, unknown>

const variantTextMap: Record<string, string> = {
	draft: 'General.draft',
	published: 'General.published',
	hidden: 'General.hidden',
	open: 'General.open',
	inprogress: 'General.inProgress',
	closed: 'General.closed',
	other: 'General.other'
}

export const Badge = ({ variant = 'draft' }: Props) => {
	const t = useTranslations()
	const variantWithLowerCase: any = variant.toLowerCase()
	const text = variantTextMap[variantWithLowerCase] || 'Unknown'

	return <Box className={badge({ variant: variantWithLowerCase })}>{t(text)}</Box>
}
