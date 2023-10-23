import { ReactNode } from 'react'

import { optimizeResponsiveArray } from 'style/utils/optimizeResponsiveArray'
import { ResponsiveRangeProps, resolveResponsiveRangeArray } from 'style/utils/resolveResponsiveRange'

import { Box } from '../box/Box'

interface Props extends ResponsiveRangeProps {
	children: ReactNode
}

export const Hidden = ({ children, above, below }: Props) => {
	const [hiddenOnMobile, hiddenOnTablet, hiddenOnDesktop] = resolveResponsiveRangeArray({ above, below })

	const display = optimizeResponsiveArray([
		hiddenOnMobile ? 'none' : 'block',
		hiddenOnTablet ? 'none' : 'block',
		hiddenOnDesktop ? 'none' : 'block'
	])

	return <Box display={display}>{children}</Box>
}
