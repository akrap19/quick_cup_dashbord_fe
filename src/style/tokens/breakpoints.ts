export const breakpointNames = ['mobile', 'tablet', 'desktop']

export const breakpoints = {
	mobile: '0',
	tablet: '768',
	desktop: '1024'
}

export type Breakpoint = keyof typeof breakpoints
