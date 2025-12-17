export const breakpointNames = ['mobile', 'tablet', 'desktop']

export const breakpoints = {
	mobile: '0',
	semiWideMobile: '480',
	wideMobile: '640',
	tablet: '768',
	desktop: '1024',
	semiWideDesktop: '1280',
	wideDesktop: '1536'
}

export type Breakpoint = keyof typeof breakpoints
