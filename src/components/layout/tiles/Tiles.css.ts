// import { style, styleVariants } from '@vanilla-extract/css'
// import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'

// import { type Breakpoint, breakpoints } from 'style/tokens/breakpoints'
// import { responsiveStyle } from 'style/utils/responsiveStyle'

// const tilesProperties = defineProperties({
// 	conditions: {
// 		mobile: {},
// 		tablet: { '@media': `screen and (min-width: ${breakpoints.tablet}px)` },
// 		desktop: { '@media': `screen and (min-width: ${breakpoints.desktop}px)` }
// 	},
// 	defaultCondition: 'mobile',
// 	properties: {
// 		flex: {
// 			1: '100%',
// 			2: `0 0 ${100 / 2}%`,
// 			3: `0 0 ${100 / 3}%`,
// 			4: `0 0 ${100 / 4}%`,
// 			5: `0 0 ${100 / 5}%`,
// 			6: `0 0 ${100 / 6}%`
// 		}
// 	},
// 	shorthands: {
// 		columns: ['flex']
// 	}
// })

// export const tilesAtoms = createSprinkles(tilesProperties)

// export type TilesAtoms = Parameters<typeof tilesAtoms>[0]

export {}
