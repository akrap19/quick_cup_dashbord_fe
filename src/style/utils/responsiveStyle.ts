import { breakpoints } from '../tokens/breakpoints'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CSSProps = Record<string, any>

interface ResponsiveStyle {
	mobile?: CSSProps
	tablet?: CSSProps
	desktop?: CSSProps
}

interface MediaQueryMap {
	[key: string]: (styles: CSSProps) => CSSProps
}

const breakpointQuery = {
	mobile: `screen and (min-width: ${breakpoints.mobile}px)`,
	tablet: `screen and (min-width: ${breakpoints.tablet}px)`,
	desktop: `screen and (min-width: ${breakpoints.desktop}px)`
}

// This works but needs to be clearer
const makeMediaQuery =
	(mediaQuery: string) =>
	(styles?: CSSProps): CSSProps =>
		!styles || Object.keys(styles).length === 0 ? {} : { [`@media ${mediaQuery}`]: styles }[`@media ${mediaQuery}`]

const mediaQueryMap: MediaQueryMap = {
	mobile: makeMediaQuery(breakpointQuery.mobile),
	tablet: makeMediaQuery(breakpointQuery.tablet),
	desktop: makeMediaQuery(breakpointQuery.desktop)
}

export const responsiveStyle = ({ mobile, tablet, desktop }: ResponsiveStyle): CSSProps => {
	const styles: CSSProps = {}

	if (mobile) {
		// eslint-disable-next-line no-restricted-syntax
		for (const prop in mobile) {
			if (prop !== '@media') {
				styles[prop] = mobile[prop]
			}
		}
	}

	if (tablet || desktop) {
		styles['@media'] = {}

		if (tablet) {
			styles['@media'][breakpointQuery.tablet] = mediaQueryMap.tablet(tablet)
		}

		if (desktop) {
			styles['@media'][breakpointQuery.desktop] = mediaQueryMap.desktop(desktop)
		}
	}

	return styles
}
