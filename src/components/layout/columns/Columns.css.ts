import { style } from '@vanilla-extract/css'
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'

import { breakpoints } from '../../../style/tokens/breakpoints'

export const grid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(12, 1fr)'
})

const columnProperties = defineProperties({
	conditions: {
		mobile: {},
		tablet: { '@media': `screen and (min-width: ${breakpoints.tablet}px)` },
		desktop: { '@media': `screen and (min-width: ${breakpoints.desktop}px)` }
	},
	defaultCondition: 'mobile',
	responsiveArray: ['mobile', 'tablet', 'desktop'],
	properties: {
		gridColumn: {
			1: 'span 1',
			2: 'span 2',
			3: 'span 3',
			4: 'span 4',
			5: 'span 5',
			6: 'span 6',
			7: 'span 7',
			8: 'span 8',
			9: 'span 9',
			10: 'span 10',
			11: 'span 11',
			12: 'span 12'
		}
	},
	shorthands: {
		columns: ['gridColumn']
	}
})

export const columnsAtoms = createSprinkles(columnProperties)

export type Columns = Parameters<typeof columnsAtoms>[0]
